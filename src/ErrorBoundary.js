import React from "react";
import ErrorFallback from "./ErrorFallback";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("🚀 > ErrorBoundary > componentDidCatch > error=", error);
    console.error(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      console.log("🚀 > ErrorBoundary > render > this.state=", this.state);
      // You can render any custom fallback UI or error message here
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
