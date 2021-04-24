import React from 'react';
import { Button, Col, Container, Label, Row } from "reactstrap";

const Post = ({ dataFeeds, accountInfo, handleActionPost }) => {

  const Feeds = dataFeeds.map((data) => {
  const idPOST = data.id;

  return (
    <Container key={idPOST} className="container-post">
      <Row>
        <Col xs="6">
            <div className="container-post-1">
              <div className="post">
                <h5>Post number: {idPOST}</h5>
                <h6>Title: {data.title}</h6>
                <div>
                  <Label>Description:</Label>
                  <p>{data.description}</p>
                </div>

                <div>
                  <Label>Detail:</Label>
                  <p>{data.detail}</p>
                </div>
              </div>

              <div className="sidebar">
                <img
                  src={data.img}
                  alt="Img of Post"
                  style={{ opacity: ".8", width: "30%", height: "30%" }}
                />
              </div>
            </div>

            {accountInfo.role === "admin" ? ( 
                <div>
                  <Button 
                    color="primary"
                    onClick={() => handleActionPost('ADD')}
                  >
                    Create POST
                  </Button>

                  <Button 
                    color="secondary"
                    className="mg-l-3" 
                    onClick={() => handleActionPost('EDIT', idPOST)}
                  >
                    Edit Post
                  </Button>
                  <Button 
                    color="danger"
                    className="mg-l-3"  
                    onClick={() => handleActionPost('DELETE', idPOST)}
                  >
                    Delete Post
                  </Button>
                </div>

                 ) : (<></>)}
        </Col>
      </Row>
    </Container>
  )});
  
  return (
    <div>
      { Feeds }
    </div>
  )
}

export { Post };
