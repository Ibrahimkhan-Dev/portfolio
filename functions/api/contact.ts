interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
}

interface TurnstileVerificationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
  "error-codes"?: string[];
}

interface FunctionContext {
  request: Request;
  env: Env;
}

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const EXPECTED_TURNSTILE_HOSTNAME = "portfolio-4rr.pages.dev";

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanSubjectValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function verifyTurnstileToken(
  secretKey: string,
  token: string,
  remoteIp: string | null,
): Promise<TurnstileVerificationResponse> {
  const payload: {
    secret: string;
    response: string;
    remoteip?: string;
  } = {
    secret: secretKey,
    response: token,
  };

  if (remoteIp) {
    payload.remoteip = remoteIp;
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Turnstile Siteverify returned status ${response.status}.`,
    );
  }

  return (await response.json()) as TurnstileVerificationResponse;
}

export async function onRequestPost(
  context: FunctionContext,
): Promise<Response> {
  const { request, env } = context;

  if (
    !env.RESEND_API_KEY ||
    !env.CONTACT_TO_EMAIL ||
    !env.CONTACT_FROM_EMAIL ||
    !env.TURNSTILE_SECRET_KEY
  ) {
    console.error("Contact form environment variables are missing.");

    return jsonResponse(
      {
        success: false,
        message: "The contact service is temporarily unavailable.",
      },
      500,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return jsonResponse(
      {
        success: false,
        message: "The request must contain JSON.",
      },
      415,
    );
  }

  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return jsonResponse(
      {
        success: false,
        message: "The submitted form data is invalid.",
      },
      400,
    );
  }

  const name =
    typeof body.name === "string" ? body.name.trim() : "";

  const email =
    typeof body.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

  const message =
    typeof body.message === "string"
      ? body.message.trim()
      : "";

  const turnstileToken =
    typeof body.turnstileToken === "string"
      ? body.turnstileToken.trim()
      : "";

  if (name.length < 2 || name.length > 100) {
    return jsonResponse(
      {
        success: false,
        message: "Please enter a valid name.",
      },
      400,
    );
  }

  if (email.length > 254 || !isValidEmail(email)) {
    return jsonResponse(
      {
        success: false,
        message: "Please enter a valid email address.",
      },
      400,
    );
  }

  if (message.length < 10 || message.length > 2000) {
    return jsonResponse(
      {
        success: false,
        message:
          "Your message must contain between 10 and 2000 characters.",
      },
      400,
    );
  }

  if (!turnstileToken || turnstileToken.length > 2048) {
    return jsonResponse(
      {
        success: false,
        message: "Please complete the security verification.",
      },
      400,
    );
  }

  let turnstileVerification: TurnstileVerificationResponse;

  try {
    turnstileVerification = await verifyTurnstileToken(
      env.TURNSTILE_SECRET_KEY,
      turnstileToken,
      request.headers.get("CF-Connecting-IP"),
    );
  } catch (error) {
    console.error("Turnstile verification request failed:", error);

    return jsonResponse(
      {
        success: false,
        message:
          "Security verification is temporarily unavailable. Please try again.",
      },
      502,
    );
  }

  if (!turnstileVerification.success) {
    console.warn(
      "Turnstile verification rejected:",
      turnstileVerification["error-codes"] ?? [],
    );

    return jsonResponse(
      {
        success: false,
        message: "Security verification failed. Please try again.",
      },
      400,
    );
  }

  if (
    turnstileVerification.hostname !==
    EXPECTED_TURNSTILE_HOSTNAME
  ) {
    console.warn(
      "Turnstile verification returned an unexpected hostname:",
      turnstileVerification.hostname ?? "missing",
    );

    return jsonResponse(
      {
        success: false,
        message: "Security verification failed. Please try again.",
      },
      400,
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll(
    "\n",
    "<br />",
  );

  const emailText = [
    "New portfolio contact message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const emailHtml = `
    <div
      style="
        font-family: Arial, sans-serif;
        max-width: 640px;
        margin: 0 auto;
        color: #181818;
        line-height: 1.6;
      "
    >
      <h1 style="font-size: 24px; margin-bottom: 24px;">
        New portfolio contact message
      </h1>

      <p>
        <strong>Name:</strong>
        ${safeName}
      </p>

      <p>
        <strong>Email:</strong>
        ${safeEmail}
      </p>

      <div style="margin-top: 24px;">
        <strong>Message:</strong>

        <div
          style="
            margin-top: 10px;
            padding: 16px;
            background: #f5f5f5;
            border-left: 4px solid #ff5722;
          "
        >
          ${safeMessage}
        </div>
      </div>
    </div>
  `;

  try {
    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL,
          to: [env.CONTACT_TO_EMAIL],
          reply_to: email,
          subject: `Portfolio enquiry from ${cleanSubjectValue(name)}`,
          text: emailText,
          html: emailHtml,
        }),
      },
    );

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();

      console.error(
        "Resend contact email failed:",
        resendResponse.status,
        resendError,
      );

      return jsonResponse(
        {
          success: false,
          message:
            "Your message could not be sent. Please try again later.",
        },
        502,
      );
    }

    return jsonResponse({
      success: true,
      message: "Your message was sent successfully.",
    });
  } catch (error) {
    console.error("Unexpected contact form error:", error);

    return jsonResponse(
      {
        success: false,
        message:
          "Your message could not be sent. Please try again later.",
      },
      500,
    );
  }
}