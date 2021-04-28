import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import "./../../Layout/css/Admin.css";
import { toast } from 'react-toastify';
import { user, feeds } from "./../../../mooks";
import { AuthContext } from '../../../store';
import { logoutAction } from "../../../store/user/action";
import { Header } from './components/Header';
import { Post } from './components/Post';

const Admin = () => {
  const { store, dispatch } = React.useContext(AuthContext);

  const [dataFeeds, setDataFeeds] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [titleForm, setTitleForm] = React.useState('');
  const dataFormEmty = {
    id: null,
    idAuther: null,
    title: '',
    img: '',
    description: '',
    detail: ''
  };
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

  const handleLogout = () => {
    dispatch(logoutAction(store.ind));
    toast.success("Logout Successfully", {autoClose: 2000});
    localStorage.setItem('login-status', '-1');
  }

  const onCloseModal = () => {
    setTitleForm('');
    setDataForm(dataFormEmty);
    setModal(false);
  };

  const handleActionPost = async (action, id) => {
    switch (action) {
      case 'ADD':
        setTitleForm("Create Post");
        setModal(true);
        break;

      case 'EDIT':
        setTitleForm("Edit Post");
        const ind = dataFeeds.findIndex((post) => post.id === id);
        setDataForm(dataFeeds[ind]);
        setModal(true);
        break;

      case 'DELETE':
        try {
          const idDeleted = await feeds.removeFeed(id);
          setDataFeeds(dataFeeds.filter((item) => item.id !== idDeleted));
          toast.success("Deleted Post Successfully", {autoClose: 2000});
        } catch (error) {
          toast.error(`Delete Post Failer with error code: ${error}`, {autoClose: 5000});
        }
        break;

      default:
        break;
    };
  }; 

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
      toast.error(`Update Post Failer with error code: ${error}`, {autoClose: 5000});
    } finally {
      onCloseModal();
    }
  };

  return (
    <div>
      <Header 
        accountInfo={accountInfo} 
        handleLogout={handleLogout}
      />

      <Button 
        color="primary"
        onClick={() => handleActionPost('ADD')}
      >
        Create POST
      </Button>

      { dataFeeds.map((post) => (
          <Post
          key={post.id}  
          post={post}
          accountInfo={accountInfo}
          handleActionPost={(action) => handleActionPost(action, post.id)}
        />
      ))}

      {/* =============== Form Dialog POST =============== */}
      <div>
        <Modal isOpen={modal}>
          <ModalHeader toggle={onCloseModal}>{titleForm}</ModalHeader>
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
            <Button color="primary" onClick={() => onSaveFormPost()}>Save</Button>
            <Button color="secondary" onClick={onCloseModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>      
    </div>
  );
};

export { Admin };
