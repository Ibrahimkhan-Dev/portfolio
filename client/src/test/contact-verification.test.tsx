import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const scriptSelector = 'script[src^="https://challenges.cloudflare.com/turnstile/"]';

describe("Contact verification", () => {
  let Contact: typeof import("@/components/sections/contact").default;

  beforeAll(async () => {
    vi.stubEnv("VITE_TURNSTILE_SITE_KEY", "test-widget");
    Contact = (await import("@/components/sections/contact")).default;
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    document.querySelector(scriptSelector)?.remove();
    vi.unstubAllGlobals();
  });

  it("loads once when the visitor uses the form and sends only after verification", async () => {
    const fetchContact = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true })),
    );
    vi.stubGlobal("fetch", fetchContact);
    render(<Contact />);

    expect(document.querySelector(scriptSelector)).toBeNull();

    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Email");
    const message = screen.getByLabelText("Message");
    fireEvent.focus(name);
    fireEvent.focus(email);
    expect(document.querySelectorAll(scriptSelector)).toHaveLength(1);

    fireEvent.change(name, { target: { value: "Portfolio QA" } });
    fireEvent.change(email, { target: { value: "qa@example.com" } });
    fireEvent.change(message, { target: { value: "Verifying the contact form." } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    expect(fetchContact).not.toHaveBeenCalled();

    let completeVerification: TurnstileRenderOptions["callback"];
    vi.stubGlobal("turnstile", {
      render: vi.fn((_container: HTMLElement, options: TurnstileRenderOptions) => {
        completeVerification = options.callback;
        return "widget";
      }),
      remove: vi.fn(),
      reset: vi.fn(),
    });

    await act(async () => {
      fireEvent.load(document.querySelector(scriptSelector)!);
    });
    expect(completeVerification).toBeTypeOf("function");
    act(() => completeVerification?.("verified-token"));

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() => {
      expect(screen.getByText("Your message was sent successfully.")).toBeInTheDocument();
    });
    expect(fetchContact).toHaveBeenCalledTimes(1);
    const [url, options] = fetchContact.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(options.body).turnstileToken).toBe("verified-token");
  });
});
