import React from "react";
import ErrorFallback from "./ErrorFallback";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("🚀 > ErrorBoundary > componentDidCatch > error=", error);
    // Set the error property in the state
    this.setState({ error });
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      console.log("🚀 > ErrorBoundary > render > this.state=", this.state);
      // You can render any custom fallback UI
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
