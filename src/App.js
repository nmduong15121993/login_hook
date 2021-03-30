import React from 'react';
import { Auth } from './component/Auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <Auth />
      <ToastContainer />
    </div>
  )
}

export default App;
