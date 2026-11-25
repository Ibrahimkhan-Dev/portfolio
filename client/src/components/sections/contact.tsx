import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  LockKeyhole,
  MessagesSquare,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./contact.module.css";
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

    if (!siteKey) return;

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
            appearance: "interaction-only",
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
        const feedback = statusMessageRef.current;
        if (feedback?.closest("form")?.contains(document.activeElement)) {
          feedback.focus();
        }
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

    if (!turnstileSiteKey) {
      setFieldError(null);
      setStatus("error");
      setStatusMessage("The form is temporarily unavailable. Please use the email link to get in touch.");
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
    <footer id="contact" className={styles.section} aria-labelledby="contact-title">
      <p className={styles.inscription}>Good<br />Ideas<br />Create<br />Great<br />Things</p>
      <div className={styles.shell}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Let’s connect</p>
              <h2 id="contact-title">Let’s build <span>something<br />meaningful</span></h2>
              <p className={styles.lead}>Whether it’s a project, an opportunity, or just a tech conversation — I’d love to hear from you.</p>
            </div>
            <div className={styles.cards}>
              <a href={`mailto:${emailAddress}`} className={styles.card}>
                <Mail aria-hidden="true" />
                <div>Email<strong>{emailAddress}</strong><small>Let’s discuss your ideas</small></div>
              </a>
              <a href="tel:+923345019225" className={styles.card}>
                <Phone aria-hidden="true" />
                <div>Phone<strong>+92 334 5019225</strong><small>Available for calls</small></div>
              </a>
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <Linkedin aria-hidden="true" />
                <div>LinkedIn<small>Connect with me</small></div>
                <ExternalLink className={styles.external} size={13} aria-hidden="true" />
              </a>
              <div className={styles.card}>
                <MapPin aria-hidden="true" />
                <div>Location<strong>Lahore, Pakistan</strong><small>Open to remote opportunities</small></div>
              </div>
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelHeading}>
              <MessagesSquare aria-hidden="true" />
              <div>
                <h3>Send a Message</h3>
                <p id="contact-form-description">Tell me about your project, opportunity, or just say hello!</p>
              </div>
            </div>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              aria-describedby="contact-form-description"
              aria-busy={isSubmitting}
              noValidate
            >
              <div className={styles.row}>
                <div className="min-w-0">
                  <label htmlFor="contact-name">
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
                    className={styles.field}
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

                <div className="min-w-0">
                  <label htmlFor="contact-email">
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
                    placeholder="your.email@example.com"
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
                    className={styles.field}
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

              <div className={styles.messageGroup}>
                <label htmlFor="contact-message">
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
                  placeholder="Tell me more…"
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
                  className={styles.field}
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

              <div hidden={!turnstileSiteKey} className="min-w-0">
                <div
                  ref={turnstileContainerRef}
                  className="w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                className={styles.submit}
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

                    <ArrowRight
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      aria-hidden="true"
                    />
                  </>
                )}
              </Button>
            </form>
            <p className={styles.note}><LockKeyhole size={13} aria-hidden="true" /> Your contact details will only be used to reply to your message.</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-white/50 sm:tracking-[0.3em] md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            Muhammad Ibrahim Khan
          </p>

          <div className="flex items-center gap-6 sm:gap-10">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="View Muhammad Ibrahim Khan's LinkedIn profile in a new tab"
            >
              LinkedIn
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
