import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

describe("<App />", () => {
  it("renders", () => {
    // Create a QueryClient instance
    const queryClient = new QueryClient();

    // Wrap your component with QueryClientProvider and provide the QueryClient instance
    // This ensures that the useQueryClient hook in your App component has access to a QueryClient
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  });
});
