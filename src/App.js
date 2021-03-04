import React from 'react'
import {LoginHook} from './component/LoginHook';
const App = () => {
  return (
    <div>
      <LoginHook />
    </div>
  )
}

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Switch, Route, useHistory, Redirect} from "react-router-dom";

// // component 
// // import { Login } from './component/Login';
// // import { Main } from "./component/Main";

// const App = () => {
//   return (

//     <Router>
//       <Switch>
//         <Route 
//           path="/admin" 
//           render={() => {return localStorage.getItem("accessToken" ? <Admin/> : <Redirect to="/" />)}} 
//         >
//           {/* <Admin/> */}
//         </Route>

//         <Route path="/">
//           <Login/> 
//         </Route>

//       </Switch>
//     </Router>
//   )
// }

// export default App;

// function Admin() {
//   let history = useHistory();
//   let logout = () => {
//     localStorage.removeItem("accessToken");
//     history.replace("/");
//   }
//   return (
//     <div>
//       <h2>Admin</h2>
//       <button onClick={logout} >Logout</button>
//     </div>
//   )
// }

// function Login() {
//   let history = useHistory();
//   let login = () => {
//     localStorage.setItem("accessToken", true);
//     history.replace("/admin");
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <button onClick={login} >Login</button>
//     </div>
//   )

// }