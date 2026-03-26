import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : String(error);
    return { hasError: true, message };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
          <div className="text-center space-y-6 max-w-lg">
            <div className="text-6xl font-black text-primary uppercase italic font-display">
              Oops
            </div>
            <p className="text-xl font-bold text-white/70 uppercase tracking-tight">
              Something went wrong
            </p>
            <p className="text-sm text-white/30 font-mono break-all">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
