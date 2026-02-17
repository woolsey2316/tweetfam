import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";

if (typeof document !== "undefined") {
  void Promise.all([import("./index.css"), import("./App")]).then(
    ([, { default: App }]) => {
      const root = ReactDOM.createRoot(document.getElementById("root")!);
      root.render(
        <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </React.StrictMode>
      );
    }
  );
}
