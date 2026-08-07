import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/ui/site-animations";
import { Textarea } from "@/components/ui/textarea";

const emailAddress = "ibrahimkhanwork7@gmail.com";

const linkedInUrl =
  "https://linkedin.com/in/muhammad-ibrahim-khan-8022a7375";

const resumeUrl = "/Muhammad-Ibrahim-Khan-Resume.pdf";

const turnstileSiteKey =
  import.meta.env.VITE_TURNSTILE_SITE_KEY;

type FormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

type FieldError =
  | keyof ContactFormState
  | "turnstile"
  | null;

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

interface ContactApiResponse {
  success?: boolean;
  message?: string;
}

const initialForm: ContactFormState = {
  name: "",
  email: "",
  message: "",
};

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] =
    useState<ContactFormState>(initialForm);

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [statusMessage, setStatusMessage] =
    useState("");

  const [fieldError, setFieldError] =
    useState<FieldError>(null);

  const [turnstileToken, setTurnstileToken] =
    useState("");

  const nameInputRef =
    useRef<HTMLInputElement | null>(null);

  const emailInputRef =
    useRef<HTMLInputElement | null>(null);

  const messageInputRef =
    useRef<HTMLTextAreaElement | null>(null);

  const turnstileContainerRef =
    useRef<HTMLDivElement | null>(null);

  const turnstileWidgetIdRef =
    useRef<string | null>(null);

  const statusMessageRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const siteKey = turnstileSiteKey;

    if (!siteKey) {
      setStatus("error");
      setFieldError(null);
      setStatusMessage(
        "Security verification is unavailable. Please try again later.",
      );

      return;
    }

    let retryTimer: number | undefined;
    let attempts = 0;

    const renderTurnstileWidget = (): boolean => {
      if (turnstileWidgetIdRef.current !== null) {
        return true;
      }

      if (
        !turnstileContainerRef.current ||
        !window.turnstile
      ) {
        return false;
      }

      turnstileWidgetIdRef.current =
        window.turnstile.render(
          turnstileContainerRef.current,
          {
            sitekey: siteKey,
            theme: "dark",
            size: "flexible",
            appearance: "always",
            callback: (token) => {
              setTurnstileToken(token);
            },
            "expired-callback": () => {
              setTurnstileToken("");
            },
            "error-callback": () => {
              setTurnstileToken("");
              setFieldError(null);
              setStatus("error");
              setStatusMessage(
                "Security verification failed. Please try again.",
              );
            },
          },
        );

      return true;
    };

    if (!renderTurnstileWidget()) {
      retryTimer = window.setInterval(() => {
        attempts += 1;

        if (renderTurnstileWidget()) {
          window.clearInterval(retryTimer);
          retryTimer = undefined;
          return;
        }

        if (attempts >= 50) {
          window.clearInterval(retryTimer);
          retryTimer = undefined;

          setFieldError(null);
          setStatus("error");
          setStatusMessage(
            "Security verification could not load. Please refresh the page.",
          );
        }
      }, 100);
    }

    return () => {
      if (retryTimer !== undefined) {
        window.clearInterval(retryTimer);
      }

      if (
        window.turnstile &&
        turnstileWidgetIdRef.current !== null
      ) {
        window.turnstile.remove(
          turnstileWidgetIdRef.current,
        );

        turnstileWidgetIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      !turnstileToken ||
      fieldError !== "turnstile"
    ) {
      return;
    }

    setFieldError(null);
    setStatus("idle");
    setStatusMessage("");
  }, [fieldError, turnstileToken]);

  useEffect(() => {
    if (
      (status !== "success" &&
        status !== "error") ||
      fieldError !== null ||
      !statusMessage
    ) {
      return;
    }

    const focusFrame =
      window.requestAnimationFrame(() => {
        statusMessageRef.current?.focus();
      });

    return () => {
      window.cancelAnimationFrame(focusFrame);
    };
  }, [fieldError, status, statusMessage]);

  const resetTurnstile = () => {
    setTurnstileToken("");

    if (
      window.turnstile &&
      turnstileWidgetIdRef.current !== null
    ) {
      window.turnstile.reset(
        turnstileWidgetIdRef.current,
      );
    }
  };

  const focusInvalidField = (
    field: Exclude<FieldError, null>,
  ) => {
    window.requestAnimationFrame(() => {
      if (field === "name") {
        nameInputRef.current?.focus();
        return;
      }

      if (field === "email") {
        emailInputRef.current?.focus();
        return;
      }

      if (field === "message") {
        messageInputRef.current?.focus();
        return;
      }

      turnstileContainerRef.current?.focus();
    });
  };

  const showValidationError = (
    field: Exclude<FieldError, null>,
    message: string,
  ) => {
    setFieldError(field);
    setStatus("error");
    setStatusMessage(message);
    focusInvalidField(field);
  };

  const updateField = (
    field: keyof ContactFormState,
    value: string,
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    if (
      fieldError === field ||
      (fieldError === null &&
        (status === "success" ||
          status === "error"))
    ) {
      setFieldError(null);
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) {
      showValidationError(
        "name",
        "Please enter a name containing at least 2 characters.",
      );

      return;
    }

    if (!email || !emailPattern.test(email)) {
      showValidationError(
        "email",
        "Please enter a valid email address.",
      );

      return;
    }

    if (message.length < 10) {
      showValidationError(
        "message",
        "Your message must contain at least 10 characters.",
      );

      return;
    }

    if (!turnstileToken) {
      showValidationError(
        "turnstile",
        "Please complete the security verification.",
      );

      return;
    }

    setFieldError(null);
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          turnstileToken,
        }),
      });

      let result: ContactApiResponse = {};

      try {
        result =
          (await response.json()) as ContactApiResponse;
      } catch {
        result = {};
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Your message could not be sent. Please try again.",
        );
      }

      setForm(initialForm);
      setFieldError(null);
      setStatus("success");
      setStatusMessage(
        result.message ||
          "Your message was sent successfully.",
      );
    } catch (error) {
      setFieldError(null);
      setStatus("error");

      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again.",
      );
    } finally {
      resetTurnstile();
    }
  };

  const isSubmitting =
    status === "submitting";

  const nameHasError =
    fieldError === "name";

  const emailHasError =
    fieldError === "email";

  const messageHasError =
    fieldError === "message";

  const turnstileHasError =
    fieldError === "turnstile";

  return (
    <footer
      id="contact"
      className="relative border-t-8 border-primary bg-[#050505] pb-10 pt-14 sm:pb-14 sm:pt-20 md:pt-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-stretch gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.95fr)] lg:gap-14 xl:gap-20">
          <Reveal>
            <h2 className="mb-6 text-4xl font-black uppercase italic leading-none sm:mb-10 sm:text-6xl md:text-8xl">
              Let&apos;s
              <br />
              <span className="text-primary">
                Connect
              </span>
            </h2>

            <p className="mb-8 max-w-xl text-lg font-medium leading-relaxed text-muted-foreground sm:mb-12 sm:text-2xl">
              Building enterprise software,
              modernizing a legacy system, or
              looking for a .NET developer?
              Let&apos;s discuss how I can
              contribute.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <a
                href={`mailto:${emailAddress}`}
                className="group flex min-h-27 items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all hover:border-primary/40 hover:bg-primary/4 sm:col-span-2 sm:gap-5 sm:p-5"
                aria-label={`Email Muhammad Ibrahim Khan at ${emailAddress}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white/5 text-primary transition-all group-hover:bg-primary group-hover:text-black sm:h-16 sm:w-16">
                  <Mail
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
                    Professional Email
                  </p>

                  <p className="truncate text-base font-black text-white transition-colors group-hover:text-primary sm:text-2xl">
                    {emailAddress}
                  </p>
                </div>
              </a>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-27 items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all hover:border-primary/40 hover:bg-primary/4 sm:gap-5 sm:p-5"
                aria-label="View Muhammad Ibrahim Khan's LinkedIn profile in a new tab"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white/5 text-primary transition-all group-hover:bg-primary group-hover:text-black sm:h-16 sm:w-16">
                  <Linkedin
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
                    Professional Profile
                  </p>

                  <p className="truncate text-base font-black text-white transition-colors group-hover:text-primary sm:text-2xl">
                    LinkedIn
                  </p>
                </div>
              </a>

              <a
                href="tel:+923345019225"
                className="group flex min-h-27 items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all hover:border-primary/40 hover:bg-primary/4 sm:gap-5 sm:p-5"
                aria-label="Call Muhammad Ibrahim Khan at plus 92 334 5019225"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white/5 text-primary transition-all group-hover:bg-primary group-hover:text-black sm:h-16 sm:w-16">
                  <Phone
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
                    Phone
                  </p>

                  <p className="text-base font-black text-white transition-colors group-hover:text-primary sm:text-2xl">
                    +92 334 5019225
                  </p>
                </div>
              </a>

              <div className="flex min-h-27 items-center gap-4 border border-white/5 bg-white/2 p-4 sm:gap-5 sm:p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white/5 text-primary sm:h-16 sm:w-16">
                  <MapPin
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
                    Location
                  </p>

                  <p className="text-base font-black text-white sm:text-2xl">
                    Lahore, Pakistan
                  </p>
                </div>
              </div>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-27 items-center gap-4 border border-white/5 bg-white/2 p-4 transition-all hover:border-primary/40 hover:bg-primary/4 sm:gap-5 sm:p-5"
                aria-label="View Muhammad Ibrahim Khan's resume in a new tab"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white/5 text-primary transition-all group-hover:bg-primary group-hover:text-black sm:h-16 sm:w-16">
                  <FileText
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">
                    Professional Resume
                  </p>

                  <p className="text-base font-black text-white transition-colors group-hover:text-primary sm:text-2xl">
                    View Resume
                  </p>
                </div>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full border-2 border-white/5 bg-card p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12 xl:p-14">
              <div className="mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                  Start a Conversation
                </h3>

                <p
                  id="contact-form-description"
                  className="mt-3 leading-relaxed text-muted-foreground"
                >
                  Send me a message directly
                  through the website. I will
                  reply to the email address you
                  provide.
                </p>
              </div>

              <form
                className="space-y-6 sm:space-y-8"
                onSubmit={handleSubmit}
                aria-describedby="contact-form-description"
                aria-busy={isSubmitting}
                noValidate
              >
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-black uppercase tracking-widest text-primary"
                    >
                      Name
                    </label>

                    <Input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
                      disabled={isSubmitting}
                      placeholder="Your name"
                      value={form.name}
                      aria-invalid={nameHasError}
                      aria-describedby={
                        nameHasError
                          ? "contact-name-error"
                          : undefined
                      }
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value,
                        )
                      }
                      className="h-12 rounded-none border-x-0 border-b-2 border-t-0 border-white/10 bg-transparent p-0 text-lg font-bold focus:border-primary sm:text-xl"
                    />

                    {nameHasError && (
                      <p
                        id="contact-name-error"
                        className="text-sm font-semibold text-red-300"
                      >
                        {statusMessage}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-black uppercase tracking-widest text-primary"
                    >
                      Email
                    </label>

                    <Input
                      ref={emailInputRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={254}
                      disabled={isSubmitting}
                      placeholder="Your email address"
                      value={form.email}
                      aria-invalid={emailHasError}
                      aria-describedby={
                        emailHasError
                          ? "contact-email-error"
                          : undefined
                      }
                      onChange={(event) =>
                        updateField(
                          "email",
                          event.target.value,
                        )
                      }
                      className="h-12 rounded-none border-x-0 border-b-2 border-t-0 border-white/10 bg-transparent p-0 text-lg font-bold focus:border-primary sm:text-xl"
                    />

                    {emailHasError && (
                      <p
                        id="contact-email-error"
                        className="text-sm font-semibold text-red-300"
                      >
                        {statusMessage}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-black uppercase tracking-widest text-primary"
                  >
                    Message
                  </label>

                  <Textarea
                    ref={messageInputRef}
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    disabled={isSubmitting}
                    placeholder="Tell me about the opportunity, project, or challenge."
                    value={form.message}
                    aria-invalid={messageHasError}
                    aria-describedby={
                      messageHasError
                        ? "contact-message-error contact-message-counter"
                        : "contact-message-counter"
                    }
                    onChange={(event) =>
                      updateField(
                        "message",
                        event.target.value,
                      )
                    }
                    className="min-h-30 resize-none rounded-none border-x-0 border-b-2 border-t-0 border-white/10 bg-transparent p-0 text-lg font-bold focus:border-primary sm:min-h-37.5 sm:text-xl"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {messageHasError && (
                        <p
                          id="contact-message-error"
                          className="text-sm font-semibold text-red-300"
                        >
                          {statusMessage}
                        </p>
                      )}
                    </div>

                    <p
                      id="contact-message-counter"
                      className="shrink-0 text-right text-xs text-white/40"
                    >
                      {form.message.length}/2000
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div
                    ref={turnstileContainerRef}
                    className="min-h-16.25 w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    role="group"
                    aria-label="Security verification"
                    aria-invalid={turnstileHasError}
                    aria-describedby={
                      turnstileHasError
                        ? "contact-turnstile-error"
                        : undefined
                    }
                    tabIndex={-1}
                  />

                  {turnstileHasError && (
                    <p
                      id="contact-turnstile-error"
                      className="text-sm font-semibold text-red-300"
                    >
                      {statusMessage}
                    </p>
                  )}
                </div>

                {status === "success" && (
                  <div
                    ref={statusMessageRef}
                    role="status"
                    aria-live="polite"
                    tabIndex={-1}
                    className="flex items-start gap-3 border border-green-500/30 bg-green-500/10 p-4 text-sm font-semibold text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />

                    <span>
                      {statusMessage}
                    </span>
                  </div>
                )}

                {status === "error" &&
                  fieldError === null && (
                    <div
                      ref={statusMessageRef}
                      role="alert"
                      aria-live="assertive"
                      tabIndex={-1}
                      className="flex items-start gap-3 border border-red-500/30 bg-red-500/10 p-4 text-sm font-semibold text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      <AlertCircle
                        className="mt-0.5 h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />

                      <span>
                        {statusMessage}
                      </span>
                    </div>
                  )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-16 w-full gap-3 rounded-none bg-primary text-lg font-black uppercase tracking-tighter text-black transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:h-20 sm:gap-4 sm:text-2xl"
                >
                  {isSubmitting ? (
                    <>
                      Sending Message

                      <LoaderCircle
                        className="h-5 w-5 animate-spin sm:h-6 sm:w-6"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <>
                      Send Message

                      <Send
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:mt-40 sm:gap-6 sm:pt-10 md:flex-row">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-white/30 sm:tracking-[0.3em] md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            Muhammad Ibrahim Khan
          </p>

          <div className="flex items-center gap-6 sm:gap-10">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="View Muhammad Ibrahim Khan's LinkedIn profile in a new tab"
            >
              LinkedIn
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="View Muhammad Ibrahim Khan's resume in a new tab"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}