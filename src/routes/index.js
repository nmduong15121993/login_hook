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

import {ManageUser} from "../component/ManageUser";

const AuthRouter = () => {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Switch>
            <Route path="/manage_user">
              <ManageUser />
            </Route>
            <Route path="/login">
              <LoginHook />
            </Route>
            <PrivateRoute path="/">
              <Admin />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export { AuthRouter };
