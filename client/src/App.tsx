import { Switch, Route, Router } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProjectDetail from "@/pages/project-detail";

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/project/:id" component={ProjectDetail} />
            <Route component={NotFound} />
          </Switch>
        </TooltipProvider>
      </Router>
    </ErrorBoundary>
  );
}
