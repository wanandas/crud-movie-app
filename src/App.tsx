import React from "react";
import { initialState, Provider } from "./models/Root";
import Display from "./pages/Display";

function App() {
  return (
    <Provider value={initialState}>
      <Display />
    </Provider>
  );
}

export default App;
