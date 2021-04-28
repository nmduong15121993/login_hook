import React from 'react';
import { Button, Col, Container, Label, Row } from "reactstrap";

const Post = ({ post, accountInfo, handleActionPost }) => {
  const { id, title, description, detail, img } = post;

  return (
    <Container className="container-post">
      <Row>
        <Col xs="6">
            <div className="container-post-1">
              <div className="post">
                <h5>Post number: {id}</h5>
                <h6>Title: {title}</h6>
                <div>
                  <Label>Description:</Label>
                  <p>{description}</p>
                </div>

                <div>
                  <Label>Detail:</Label>
                  <p>{detail}</p>
                </div>
              </div>

              <div className="sidebar">
                <img
                  src={img}
                  alt="Img of Post"
                  style={{ opacity: ".8", width: "30%", height: "30%" }}
                />
              </div>
            </div>

            {accountInfo.role === "admin" ? ( 
                <div>
                  <Button 
                    color="secondary"
                    className="mg-l-3" 
                    onClick={() => handleActionPost('EDIT')}
                  >
                    Edit Post
                  </Button>
                  <Button 
                    color="danger"
                    className="mg-l-3"  
                    onClick={() => handleActionPost('DELETE')}
                  >
                    Delete Post
                  </Button>
                </div>

                 ) : (<></>)}
        </Col>
      </Row>
    </Container>
  )
}

export { Post };
