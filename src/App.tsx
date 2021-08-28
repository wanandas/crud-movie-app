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
              <Switch>
                <Route path="/display">
                  {User.authToken ? <Display /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
              </Switch>
            </Router>
          );
        }}
      </Observer>
    </Provider>
  );
}

export default App;
