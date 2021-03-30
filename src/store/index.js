import { userInit, userReducer } from './user';

import React from 'react';

const AuthContext = React.createContext({});

const ProvideAuth = ({ children }) => {
  const [store, dispatch] = React.useReducer(userReducer, userInit);
  return (
    <AuthContext.Provider value={{ store, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { ProvideAuth, AuthContext };
