import React, { createContext} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Store from "./store/store";

import App from "./App";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        store,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
