import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from '../../store';
import { loginAction, setError } from '../../store/user/action';
import { user } from '../../mooks';

const LoginHook = () => {
  // Những cái này là state nội tại, không cần đưa vào store tổng
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { store, dispatch } = React.useContext(AuthContext);
  const { error } = store;
  const logIn = async () => {
    try {
      const id = await user.getUserName(username, password);
      dispatch(loginAction({ id }));
      setRedirect(true);
    } catch (error) {
      dispatch(setError({ error }));
    }
  };

  return redirect ? (
    <Redirect to='/admin'/>
  ) :(
    <div>
      <Container style={{ margin: "0", marginTop: "150px" }}>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 8 }}>
            <Label>Login Page</Label>
          </Col>

          <Col sm="12" md={{ size: 6, offset: 6 }}>
            <Form>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="name" className="mr-sm-2">
                  Username:
                </Label>
                <Input
                  type="text"
                  name="username"
                  id="exampleEmail"
                  placeholder="username"
                  value={username}
                  onChange={({target}) => setUsername(target.value)}
                />
              </FormGroup>

              <FormGroup
                className="mb-2 mr-sm-2 mb-sm-0"
                style={{ marginTop: "15px" }}
              >
                <Label for="examplePassword" className="mr-sm-2">
                  Password:
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password"
                  value={password}
                  onChange={({target}) => setPassword(target.value)}
                />
              </FormGroup>

              <FormGroup check style={{ marginTop: "30px" }}>
                <Input 
                  type="checkbox" 
                  name="check" 
                  id="exampleCheck"
                  value={remember}
                  onClick={({target}) => setRemember(target.checked)} 
                />
                <Label for="exampleCheck" check>
                  Check me out
                </Label>
              </FormGroup>

              <Button 
                style={{ marginTop: "10px" }}
                onClick={logIn}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        <div>{error}</div>
      </Container>
    </div>
  );
};

export { LoginHook };
