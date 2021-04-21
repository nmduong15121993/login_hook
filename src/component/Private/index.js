import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

import { AuthContext } from '../../store';

function PrivateRoute({ children, ...rest }) {
  const { store } = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() =>
        store.ind > -1 ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login" }}
          />
        )
      }
    />
  );
}

export { PrivateRoute };
