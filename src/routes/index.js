import React from "react";
import { ProvideAuth } from '../store';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

// Components
import { PrivateRoute } from '../component/Private';
import { LoginHook } from '../component/Auth/LoginHook';
// Protected router
import { Admin } from '../component/Private/Admin';

const AuthRouter = () => {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <LoginHook />
            </Route>
            <PrivateRoute path="/admin" exact>
              <Switch>
                <Route path="/" exact>
                  <Admin />
                </Route>
              </Switch>
            </PrivateRoute>
            <Route path="/" exact>
              <h1>hello</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export { AuthRouter };
