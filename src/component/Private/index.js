import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import { loginAction } from "../../store/user/action";

import { AuthContext } from '../../store';

function PrivateRoute({ children, ...rest }) {
  const { store, dispatch } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const id = localStorage.getItem('login-status');
    if (!id || id === -1) return;
    dispatch(loginAction({ id }));
    setLoading(true);
  }, [dispatch]);

  return !loading ? <div>loading...</div> : (
    <>
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
    </>
  );
}

export { PrivateRoute };
