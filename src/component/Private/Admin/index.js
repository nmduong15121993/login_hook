import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import "./../../Layout/css/Admin.css";
import { toast } from 'react-toastify';
import { user, feeds } from "./../../../mooks";
import { AuthContext } from '../../../store';
import { logoutAction } from "../../../store/user/action";
import { Header } from './components/Header';
import { Post } from './components/Post';

const Admin = () => {

  const dataFormEmty = {
    id: null,
    idAuther: null,
    title: '',
    img: '',
    description: '',
    detail: ''
  };
  const { store, dispatch } = React.useContext(AuthContext);

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
  // =============== Action ADD, EDIT, DELETE ===============
  const handleActionPost = async (action, id) => {
    if(action === 'ADD') {
      setTitleForm("Create Post");
      setModal(true);
    }
    if(action === 'EDIT') {
      setTitleForm("Edit Post");
      // setDataForm(data);
      setModal(true);
    }
    if(action === 'DELETE') {
      try {
        const idDeleted = await feeds.removeFeed(id);
        setDataFeeds(dataFeeds.filter((item) => item.id !== idDeleted));
        toast.success("Deleted Post Successfully", {autoClose: 2000});
      } catch (error) {
        console.log(error);
        toast.error(`Delete Post Failer with error code: ${error}`, {autoClose: 5000});
      }
    }
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
      console.log(error);
      toast.error(`Update Post Failer with error code: ${error}`, {autoClose: 5000});
    } finally {
      setDataForm(dataFormEmty);
      setModal(false);
    }
  }

  return (
    <div>
    {/* =============== Header ============= */}
      <Header 
        accountInfo={accountInfo} 
        handleLogout={handleLogout}
      />

    {/* =============== POST =============== */}
      <Post 
        dataFeeds={dataFeeds}
        accountInfo={accountInfo}
        handleActionPost={handleActionPost}
      />

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
