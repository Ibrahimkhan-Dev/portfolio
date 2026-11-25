let pendingLoad: Promise<TurnstileApi> | undefined;

export function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (pendingLoad) return pendingLoad;

  pendingLoad = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;

    const fail = () => {
      window.clearTimeout(timeout);
      script.remove();
      reject(new Error("Turnstile could not load"));
    };

    const timeout = window.setTimeout(fail, 10000);
    script.onerror = fail;
    script.onload = () => {
      if (!window.turnstile) {
        fail();
        return;
      }
      window.clearTimeout(timeout);
      resolve(window.turnstile);
    };

    document.head.append(script);
  }).catch((error: unknown) => {
    pendingLoad = undefined;
    throw error;
  });

  return pendingLoad;
}
