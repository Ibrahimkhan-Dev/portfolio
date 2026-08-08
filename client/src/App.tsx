import {
  lazy,
  Suspense,
  useEffect,
  useRef,
} from "react";
import { MotionConfig } from "framer-motion";
import {
  Route,
  Router,
  Switch,
  useLocation,
} from "wouter";

import { ErrorBoundary } from "@/components/error-boundary";
import Home from "@/pages/home";

const ProjectDetail = lazy(
  () => import("@/pages/project-detail"),
);

const NotFound = lazy(
  () => import("@/pages/not-found"),
);

function RouteLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground"
    >
      <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">
        Loading portfolio
      </p>
    </div>
  );
}

function RouteFocusManager() {
  const [location] = useLocation();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    let timeoutId: number | undefined;

    const focusMainContent = () => {
      const mainContent =
        document.getElementById("main-content");

      if (!mainContent) {
        return false;
      }

      mainContent.focus({
        preventScroll: true,
      });

      return true;
    };

    if (focusMainContent()) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (!focusMainContent()) {
        return;
      }

      observer.disconnect();

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
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

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [location]);

  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-10000 -translate-y-24 bg-primary px-5 py-3 text-sm font-black uppercase tracking-widest text-black transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <ErrorBoundary>
        <Router>
          <RouteFocusManager />

          <Suspense fallback={<RouteLoading />}>
            <Switch>
              <Route
                path="/"
                component={Home}
              />

              <Route
                path="/project/:id"
                component={ProjectDetail}
              />

              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </MotionConfig>
  );
}