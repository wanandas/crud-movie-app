import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Observer } from "mobx-react-lite";
import { initialState, Provider, useStore } from "./models/Root";
import Display from "./pages/Display";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Provider value={initialState}>
      <Observer>
        {() => {
          const { User } = useStore();
          return (
            <Router>
              {!User.authToken && <Redirect to="/login" />}
              <Route path="/login" component={LoginPage} />
              <Route path="/" component={Display} />
            </Router>
          );
        }}
      </Observer>
    </Provider>
  );
}

export default App;
