import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../store";
import { loginAction, setError } from "../../store/user/action";
import { user } from "../../mooks";
import "./../Layout/css/Login.css";
import { toast } from 'react-toastify';

const LoginHook = () => {
  // Những cái này là state nội tại, không cần đưa vào store tổng
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { dispatch } = React.useContext(AuthContext);

  const logIn = async () => {
    try {
      const id = await user.getUserName(username, password);
      dispatch(loginAction({ id }));
      setRedirect(true);
      toast.success("Login Successfully", {autoClose: 2000});
    } catch (error) {
      dispatch(setError(error));
      toast.error(`Login Failed: ${error}`, {autoClose: 2000});
    }
  };

  return redirect ? (
    <Redirect to="/admin" />
  ) : (
    <div className="form-login">
      <div className="form-login-1">
        <div className="form-login-2">
          <h2>Login Page</h2>
          <Form>
            <FormGroup className="mg-5">
              <Label>Username:</Label>
              <Input
                type="text"
                name="username"
                id="exampleEmail"
                placeholder="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </FormGroup>

            <FormGroup className="mg-5">
              <Label>Password:</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormGroup>

            <FormGroup check>
              <Input
                type="checkbox"
                name="check"
                id="exampleCheck"
                value={remember}
                onClick={({ target }) => setRemember(target.checked)}
              />
              <Label for="exampleCheck" check>
                Check me out
              </Label>
            </FormGroup>
            
            <Button 
              color="primary"
              style={{fontSize: "20px", fontWeight: "bold"}}
              className="submit-login"
              onClick={logIn} 
            >
              Login
            </Button>
          </Form>
        </div>
        
      </div>
    </div>
  );
};

export { LoginHook };
