import React from 'react';
import {
  Button,
  Col,
  Container,
  Row
} from "reactstrap";
import { useHistory } from 'react-router-dom';

const Header = ({ accountInfo, handleLogout }) => {
  const history = useHistory();

  return (
    <Container className="user-info">
      <Row>
        {/* =============== Info Account =============== */}
        <Col xs="6">
          <h4 style={{color: "blue"}}>User Info</h4>
          <h5>ID: {accountInfo.id}</h5>
          <h5>Username: {accountInfo.username}</h5>
          <h5>Role: {accountInfo.role}</h5>

          {/* Action User */}
          <Button
            color="primary"
            onClick={() => history.replace("/manage_user")}
          >
            Manage User
          </Button>

        </Col>
        {/* =============== Logout =============== */}
        <Col xs="6">
          <Button 
            onClick={ handleLogout } 
            color="danger"
          >
            Log Out
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export { Header };
