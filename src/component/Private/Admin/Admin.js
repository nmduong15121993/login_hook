import React from "react";
import { 
  Container,
  Row,
  Col,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from "reactstrap";

import { feeds } from "./../../../mooks";

const Admin = ({ onLogoutSuccess, accountInfo }) => {
  const [dataFeeds, setDataFeeds] = React.useState([]);
  const [modal, setModal] = React.useState(false);

  React.useEffect(() => {
    console.log("Did Mount");
    const fnPromise = async () => {
      try {
        const dataFeeds = await feeds.getFeeds();
        // console.log(dataFeeds);
        setDataFeeds(dataFeeds);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fnPromise();
  }, []);


  const onHandleDelete = (id) => {
    // console.log(id);
    const ind = dataFeeds.findIndex((item) => item.id === id);
    // console.log(ind);

    dataFeeds.splice(ind, 1);
    const fnPromise = async () => {
      try {
        const data = await feeds.removeFeed(id);
        // console.log(dataFeeds);
        
        setDataFeeds(data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fnPromise();
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs="6">
            <h1>Username Info:</h1>
            <h5>ID: {accountInfo.id}</h5>
            <h5>Username: {accountInfo.username}</h5>
            <h5>Role: {accountInfo.role}</h5>
          </Col>
          <Col xs="6">
            <Button onClick={onLogoutSuccess} color="danger">
              Log Out
            </Button>
          </Col>
        </Row>
      </Container>
      <hr />
      {accountInfo.role === "admin" ? (
        <Button color="primary" onClick={() => setModal(true)}>
          Create POST
        </Button>
      ) : (
        <></>
      )}

      {dataFeeds.map((data) => (
        <Container key={data.id}>
          <Row>
            <Col xs="6">
                <h1>Post number: {data.id}</h1>
                <h2>Title: {data.title}</h2>

                <img
                  src={data.img}
                  alt="Img of Post"
                  style={{ opacity: ".8", width: "30%", height: "30%" }}
                />

                <div>
                  <Label>Description:</Label>
                  <p>{data.description}</p>
                </div>

                <div>
                  <Label>Detail:</Label>
                  <p>{data.detail}</p>
                </div>

                <div>
                  <Label>Comment:</Label>
                  <br/>
                  { data.comments.map((comment) => 
                      <div key={comment.idUser}>
                        <span>idUser: {comment.idUser} </span>
                        <span>Content: {comment.content}</span>
                        <span>Date: {comment.time}</span>
                        <hr/>
                      </div>
                    )
                  }
                </div>
                <div>
                  <Button color="secondary" >Edit Post</Button>
                  <Button color="danger" onClick={() => onHandleDelete(data.id)}>Delete Post</Button>
                </div>
                <hr />
            </Col>
          </Row>
        </Container>
      ))}

      {
        modal ? 
        <Modal>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" >Do Something</Button>
            <Button 
              color="secondary" 
              onClick={setModal(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        : <></>
      }

    </div>
  );
};

export { Admin };
