export function scrollToElementWhenReady(
  id: string,
  behavior: ScrollBehavior,
): () => void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior, block: "start" });
    return () => {};
  }

  // Element not yet in DOM (deferred section) — wait for it.
  let timeoutId: number;

  const observer = new MutationObserver(() => {
    const target = document.getElementById(id);
    if (!target) return;
    observer.disconnect();
    window.clearTimeout(timeoutId);
    target.scrollIntoView({ behavior, block: "start" });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  timeoutId = window.setTimeout(() => {
    observer.disconnect();
  }, 5000);

  return () => {
    observer.disconnect();
    window.clearTimeout(timeoutId);
  };
}
