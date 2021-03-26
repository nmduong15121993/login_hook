import React, { useState } from "react";
import { user } from "../mooks";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
// component
import { Admin } from "./../component/Private/Admin/Admin";

const LoginHook = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [accountInfo, setAccountInfo] = useState("");

  const logIn = () => {
    const fnPromise = async () => {
      try {
        const dataUser = await user.getUserName(username, password);
        if (remember === true) {
          localStorage.setItem("account", JSON.stringify(dataUser));
        }
        setAccountInfo(dataUser);
        setLogin(true);
      } catch (error) {
        setError(error.toString());
      } finally {
      }
    };
    fnPromise();
  };

  const onLogoutSuccess = () => {
    setAccountInfo("");
    setLogin(false);
    localStorage.removeItem("account");
  };

  return (
    <div>
      {isLogin ? (
        <Admin key={isLogin} onLogoutSuccess={onLogoutSuccess} accountInfo={accountInfo} />
      ) : (
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
      )}
    </div>
  );
};

export { LoginHook };
