import React, { useEffect, useState } from 'react'
import { Button, Table } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { user } from "../../mooks";
import "../Layout/css/ManageUser.css";

// Component
import { THead } from './components/THead';
import { TBody } from './components/TBody';
import { FormUser } from './components/FormUser';

const ManageUser = () => {
  const history = useHistory();

  const [allUser, setAllUser] = useState([]);
  const initUser = {
    id: null,
    username: "",
    password: "",
    role: ""
  };
  const [dataForm, setDataForm] = useState(initUser);
  const [titleForm, setTitleForm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //=========== Did Mount ==========
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allData = await user.getAllUser();
        setAllUser(allData);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);
  //============= Close Form ===========
  const onCloseForm = () => {
    setTitleForm("");
    setIsOpen(false);
  };
  //========== Save Form User =========
  const saveFormUser = async () => {
    try {
      // Add User
      if(titleForm === 'Add User') {
        const allUsers = [...allUser];
        const newUser = await user.addUser(dataForm);
        setAllUser(allUsers.concat(newUser));
        toast.success("Add User Successfully", {autoClose: 2000});
      };
      // Edit User
      if(titleForm === 'Edit User') {
        const editData = await user.editUser(dataForm);
        if(!editData) return undefined;
        const { id } = editData;
        const ind = allUser.findIndex((item) => item.id === id);
        allUser[ind] = editData;
        setAllUser([...allUser]);
        toast.success("Edit User Successfully", {autoClose: 2000});
      };
    } catch (error) {
      toast.error(`Failed: ${error}`, {autoClose: 3000});
    } finally {
      setDataForm(initUser);
      onCloseForm();
    }
  };
  //========== Action User 'ADD' - 'EDIT' - 'DELETE' ===========
  const handleActionUser = (action, id = null) => {
    // ADD
    if(action === 'ADD') {
      setTitleForm("Add User");
      setIsOpen(true);
    }
    // EDIT
    if(action === 'EDIT') {
      const ind = allUser.findIndex((item) => item.id === id);
      setDataForm(allUser[ind]);
      setTitleForm("Edit User");
      setIsOpen(true);
    };
    // DELETE
    if(action === 'DELETE') {
      const delUser = async () => {
        try {
          const userDel = await user.removeUser(id);
          const newUser = allUser.filter((item) => item.id !== userDel.id);
          setAllUser(newUser);
          toast.success("Deleted Successfully", {autoClose: 2000});
        } catch (error) {
          toast.error(`Delete Failed: ${error}`, {autoClose: 3000});
        }
      };
      delUser();
    };
  }

  return (
    <div>
      {/*========= Back ==========*/}
      <Button 
        onClick={() => history.push("/")} 
        style={{margin: "4px"}}
      >
        Back Admin POST
      </Button>
      <h1>User List</h1>
      {/*========= Add User ==========*/}
      <Button
        className="mg-4"
        color="info"
        onClick={() => handleActionUser('ADD') }
      >
        Add User
      </Button>
      {/*========= Form User ==========*/}
      <FormUser 
        isOpen={isOpen}
        titleForm={titleForm}
        dataForm={dataForm}
        setDataForm={setDataForm}
        onCloseForm={onCloseForm}
        saveFormUser={saveFormUser}
      />
      {/*========= Table Display List User ==========*/}
      <Table bordered striped >
        <THead />
        <TBody allUser={allUser} handleActionUser={ handleActionUser } />
      </Table>
    </div>
  )
}

export {ManageUser};

