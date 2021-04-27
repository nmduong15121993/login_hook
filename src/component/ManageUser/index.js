import React, { useEffect, useState } from 'react'
import { Table } from "reactstrap";
import { toast } from 'react-toastify';
import { user } from "../../mooks";
import "../Layout/css/ManageUser.css";

// Component
import { Header } from './components/Header';
import { THead } from './components/THead';
import { TBody } from './components/TBody';
import { FormUser } from './components/FormUser';

const ManageUser = () => {
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

  const onCloseForm = () => {
    setTitleForm("");
    setDataForm(initUser);
    setIsOpen(false);
  };

  const saveFormUser = async () => {
    try {
      if(titleForm === 'Add User') {
        const allUsers = [...allUser];
        const newUser = await user.addUser(dataForm);
        setAllUser(allUsers.concat(newUser));
        toast.success("Add User Successfully", {autoClose: 2000});
      };
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
      onCloseForm();
    }
  };

  const handleActionUser = (action, id) => {
    switch (action) {
      case 'EDIT': {
        const ind = allUser.findIndex((item) => item.id === id);
        setDataForm(allUser[ind]);
        setTitleForm("Edit User");
        setIsOpen(true);
        break;
      }
      case 'DELETE': {
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
        break;
      }
    
      default:
        setTitleForm("Add User");
        setIsOpen(true);
        break;
    }
  };

  return (
    <div>
      <Header handleActionUser={handleActionUser} />

      <FormUser 
        isOpen={isOpen}
        titleForm={titleForm}
        dataForm={dataForm}
        setDataForm={setDataForm}
        onCloseForm={onCloseForm}
        saveFormUser={saveFormUser}
      />

      <Table bordered striped >
        <THead />
        <tbody>
          { allUser.map((user) => (
            <TBody
              key={user.id}
              init={user}
              handleActionUser={(action) => handleActionUser(action, user.id)}
            />
          )) }
        </tbody>
      </Table>
    </div>
  )
}

export {ManageUser};

