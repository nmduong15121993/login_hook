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
import "./../../Layout/css/Admin.css";

import React from "react";
import { toast } from 'react-toastify';
import { user, feeds } from "./../../../mooks";
import { AuthContext } from '../../../store';
import { logoutAction, setError } from "../../../store/user/action";
import { useHistory } from 'react-router-dom';
/**
 * Tách code
 * Viết thành class component
 */


const Admin = () => {
  const history = useHistory();

  const dataFormEmty = {
    id: null,
    idAuther: null,
    title: '',
    img: '',
    description: '',
    detail: ''
  };

  const { store, dispatch } = React.useContext(AuthContext);
  // const accountInfo = await user.getUser(store.ind);

  const [dataFeeds, setDataFeeds] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [titleForm, setTitleForm] = React.useState('');
  const [dataForm, setDataForm] = React.useState(dataFormEmty);
  const [accountInfo, setAccountInfo] = React.useState({});

  React.useEffect(() => {
    const fnPromise = async () => {
      if (store.ind < 0) return;
      try {
        const [dataFeed, InfoAcc] = await Promise.all([
          feeds.getFeeds(),
          user.getUser(store.ind),
        ]);
        setAccountInfo(InfoAcc);
        setDataFeeds(dataFeed);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fnPromise();
  }, [store.ind]);

  // =============== Logout ===============
  const handleLogout = () => {
    dispatch(logoutAction(store.ind));
    toast.success("Logout Successfully", {autoClose: 2000});
  }
  // =============== Delete Post ===============
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
  // =============== Create and Edit Post ===============
  const onCreatePost = () => {
    setTitleForm("Create Post");
    setModal(true);
  }

  const onHandleEdit = (data) => {
    setTitleForm("Edit Post");
    setDataForm(data);
    setModal(true);
  }

  const onSaveFormPost = async () => {
    const { id, idAuther, title, img, description, detail} = dataForm;
    try {
      if(id) {
        const data = await feeds.editFeed(dataForm);
        const index =  dataFeeds.findIndex((dataEdit) => dataEdit.id === data.id);
        dataFeeds[index] = data;
        setDataFeeds([...dataFeeds]);
        toast.success("Updated Post Successfully", {autoClose: 2000});
      } else {
        const data = await feeds.addFeed({idAuther, title, img, description, detail});
        setDataFeeds([...dataFeeds, data]);
        toast.success("Created Post Successfully", {autoClose: 2000});
      }
    } catch (error) {
      console.log(error);
      toast.error(`Update Post Failer with error code: ${error}`, {autoClose: 5000});
    } finally {
      setDataForm(dataFormEmty);
      setModal(false);
    }
  }

  return (
    <div>
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
      {/* =============== POST =============== */}
      {dataFeeds.map((data) => (
        <Container key={data.id} className="container-post">
          <Row>
            <Col xs="6">
                <div className="container-post-1">
                  <div className="post">
                    <h5>Post number: {data.id}</h5>
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
                        onClick={() => onCreatePost()}
                      >
                        Create POST
                      </Button>

                      <Button 
                        color="secondary"
                        className="mg-l-3" 
                        onClick={() => onHandleEdit(data)}
                      >
                        Edit Post
                      </Button>
                      <Button 
                        color="danger"
                        className="mg-l-3"  
                        onClick={() => onHandleDelete(data.id)}
                      >
                        Delete Post
                      </Button>
                    </div>

                     ) : (<></>)}
            </Col>
          </Row>
        </Container>
      ))}

      {/* =============== Form Dialog POST =============== */}
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
