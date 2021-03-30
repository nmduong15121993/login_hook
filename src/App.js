import React from 'react';
import { AuthRouter } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <AuthRouter />
      <ToastContainer />
    </div>
  )
}

export default App;
