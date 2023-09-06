import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const good = () => {};
  const handleButtons = (type) => {
    switch (type) {
      case "GOOD":
        store.dispatch({
          type: "GOOD",
        });
        break;
      case "OK":
        store.dispatch({
          type: "OK",
        });
        break;
      case "BAD":
        store.dispatch({
          type: "BAD",
        });
        break;
      case "RESET":
        store.dispatch({
          type: "ZERO",
        });
        break;

      default:
        return state;
    }
  };

  return (
    <div>
      <button onClick={() => handleButtons("GOOD")}>good</button>
      <button onClick={() => handleButtons("OK")}>ok</button>
      <button onClick={() => handleButtons("BAD")}>bad</button>
      <button onClick={() => handleButtons("RESET")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
