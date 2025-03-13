import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "store/store";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";

import "styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
