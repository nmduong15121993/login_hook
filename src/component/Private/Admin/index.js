import {
  Button,
  Col,
  Container,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody, 
  ModalFooter,
  Input
} from "reactstrap";

import React from "react";
import { toast } from 'react-toastify';
import { user, feeds } from "./../../../mooks";
import { AuthContext } from '../../../store';

const Admin = () => {
  const dataFormEmty = {
    id: null,
    idAuther: null,
    title: '',
    img: '',
    description: '',
    detail: ''
  }
  const { store } = React.useContext(AuthContext);
  const accountInfo = user.getUser(store.ind);

  const [dataFeeds, setDataFeeds] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [titleForm, setTitleForm] = React.useState('');
  const [dataForm, setDataForm] = React.useState(dataFormEmty);

  React.useEffect(() => {
    const fnPromise = async () => {
      try {
        const dataFeeds = await feeds.getFeeds();
        setDataFeeds(dataFeeds);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fnPromise();
  }, []);


  const onHandleDelete = async (id) => {
    try {
      const idDeleted = await feeds.removeFeed(id);
      setDataFeeds(dataFeeds.filter((item) => item.id !== idDeleted));
      toast.success("Deleted Post Successfully", {autoClose: 2000});
    } catch (error) {
      console.log(error);
      toast.error(`Delete Post Failer with error code: ${error}`, {autoClose: 5000});
    }
  }

  const onCreatePost = () => {
    setTitleForm("Create Post");
    setModal(true);
  }

  const onHandleEdit = (data) => {
    setTitleForm("Edit Post");
    setDataForm(data);
    setModal(true);
  }

  const onSaveFormPost = () => {
    const { id, idAuther, title, img, description, detail} = dataForm;

    if(id) {
      const editPost = async () => {
        try {
          const data = await feeds.editFeed(dataForm);
          const index =  dataFeeds.findIndex((dataEdit) => dataEdit.id === data.id);
          dataFeeds[index] = data;
          setDataFeeds([...dataFeeds]);
          toast.success("Updated Post Successfully", {autoClose: 2000});
        } catch (error) {
          console.log(error);
          toast.error(`Update Post Failer with error code: ${error}`, {autoClose: 5000});
        }
      };
      editPost();    
    }else {
      const addPost = async () => {
        try {
          const data = await feeds.addFeed({idAuther, title, img, description, detail});
          setDataFeeds([...dataFeeds, data]);
          toast.success("Created Post Successfully", {autoClose: 2000});
        } catch (error) {
          console.log(error);
          toast.error(`Create Failer with error code: ${error}`, {autoClose: 5000});
        }
      };
      addPost();      
    }
    
    setDataForm(dataFormEmty);
    setModal(false);
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
            <Button onClick={() => {}} color="danger">
              Log Out
            </Button>
          </Col>
        </Row>
      </Container>
      <hr />
      {accountInfo.role === "admin" ? (
        <Button color="primary" onClick={() => onCreatePost()}>
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

                {accountInfo.role === "admin" ? ( 
                    <div>
                      <Button 
                        color="secondary" 
                        onClick={() => onHandleEdit(data)}
                      >
                        Edit Post
                      </Button>
                      <Button 
                        color="danger" 
                        onClick={() => onHandleDelete(data.id)}
                      >
                        Delete Post
                      </Button>
                    </div>

                     ) : (
                    <></>
                )}
                <hr />
            </Col>
          </Row>
        </Container>
      ))}

      <div>
        <Modal isOpen={modal}>
          <ModalHeader toggle={() => setModal(false)}>{titleForm}</ModalHeader>
          <ModalBody>
            <form>
              <div>
                <Label for="exampleAuther">Auther Post</Label>
                <Input 
                  type="text" 
                  name="auther" 
                  id="exampleAuther"
                  value={dataForm.idAuther || ''}
                  onChange={({target}) => setDataForm({ ...dataForm, idAuther: +target.value})} 
                />                      
              </div>
              <div>
                <Label for="exampleName">Title</Label>
                <Input 
                  type="name" 
                  name="name" 
                  id="exampleName"
                  value={dataForm.title || ''}
                  onChange={({target}) => setDataForm({ ...dataForm, title: target.value})} 
                />                      
              </div>
              <div>
                <Label for="exampleImg">Link image</Label>
                <Input 
                  type="text" 
                  name="img" 
                  id="exampleImg"
                  value={dataForm.img || ''}
                  onChange={({target}) => setDataForm({ ...dataForm, img: target.value})} 
                />
              </div>
              <div>
                <Label for="exampleDescription">Description</Label>
                <Input 
                  type="textarea" 
                  name="description" 
                  id="exampleDescription"
                  value={dataForm.description || ''}
                  onChange={({target}) => setDataForm({ ...dataForm, description: target.value})} 
                />
              </div>
              <div>
                <Label for="exampleDetail">Detail</Label>
                <Input 
                  type="textarea" 
                  name="detail" 
                  id="exampleDetail"
                  value={dataForm.detail || ''}
                  onChange={({target}) => setDataForm({ ...dataForm, detail: target.value})} 
                />
              </div>
            </form>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => onSaveFormPost()}>Save</Button>{' '}
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>      
    </div>
  );
};

export { Admin };
