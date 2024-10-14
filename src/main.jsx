import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.jsx";
import App from "./App.jsx";
import "./styles/fonts.css";
import PageNotFound from "./pages/PageNotFound.jsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    FallbackComponent={PageNotFound}
    // onReset={() => window.location.replace("/")}
  >
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </ErrorBoundary>
);
