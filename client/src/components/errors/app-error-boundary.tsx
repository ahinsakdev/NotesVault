import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from "react";

import { AppErrorFallback } from "./app-error-fallback";

type AppErrorBoundaryState = {
  hasError: boolean;
};

const initialState: AppErrorBoundaryState = {
  hasError: false,
};

export class AppErrorBoundary extends Component<
  PropsWithChildren,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = initialState;

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("Unhandled application error:", error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState(initialState);
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return <AppErrorFallback onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}
