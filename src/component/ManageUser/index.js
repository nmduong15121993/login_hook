import React, { useEffect, useState } from 'react'
import { Button, Table, Collapse, Label, Input, Card } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { user } from "../../mooks";
import "../Layout/css/ManageUser.css";
import { toast } from 'react-toastify';

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
    const getAllUser = async () => {
      try {
        const allData = await user.getAllUser();
        setAllUser(allData);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUser();
  }, []);
  //============= Add User ===========
  const handleOpenAddUser = () => {
    setTitleForm("Add User");
    setIsOpen(true);
  };

  const onCloseForm = () => {
    setTitleForm("");
    setIsOpen(false);
  }
  //========== Save Add User =========
  const saveAddUser = () => {
    const newDataForm = {...dataForm};
    const {id, username, password, role} = newDataForm;
    const newAllUser = [...allUser];
    const addUser = async () => {
      try {
        const sendUser = {
          id: id,
          username: username,
          password: password,
          role: role
        }
        const add = await user.addUser(sendUser);
        newAllUser.push(add);
        setAllUser(newAllUser);
        toast.success("Add User Successfully", {autoClose: 2000});
      } catch (error) {
        toast.error(`Add User Failed: ${error}`, {autoClose: 3000});
      }
      finally {
        setIsOpen(false);
        setDataForm(initUser);
      }
    };
    addUser();
  }
  //========== Save Edit User =========
  const saveEditUser = () => {
    const newDataForm = {...dataForm};
    const newAllUser = [...allUser];
    const editUser = async () => {
      try {
        const editData = await user.editUser(newDataForm);
        if(!editData) return undefined;
        const { id } = editData;
        const ind = newAllUser.findIndex((item) => item.id === id);
        newAllUser[ind] = newDataForm;
        setAllUser([...newAllUser]);
        toast.success("Add User Successfully", {autoClose: 2000});
      } catch (error) {
        toast.error(`Add User Failed: ${error}`, {autoClose: 3000});
      }
      finally {
        setIsOpen(false);
        setDataForm(initUser);
      }
    };
    editUser();
  }
  
  const handleEditUser = (rowUser) => {
    setDataForm(rowUser);
    setTitleForm("Edit User");
    setIsOpen(true);
  }
  //========== Delete User ===========
  const handleDelete = (id) => {
    console.log(id);
    const newAllUser = [...allUser];
    const delUser = async () => {
      try {
        const userDel = await user.removeUser(id);
        const ind = newAllUser.findIndex((item) => item.id === userDel.id);
        newAllUser.splice(ind, 1);
        setAllUser(newAllUser);
        toast.success("Deleted Successfully", {autoClose: 2000});
      } catch (error) {
        toast.error(`Delete Failed: ${error}`, {autoClose: 3000});
      }
    };
    delUser();
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
        onClick={ handleOpenAddUser }
      >
        Add User
      </Button>

      <Collapse isOpen={isOpen}>
        <Card style={{width: "300px"}}>
        <h5 className="card-form-add">{ titleForm }</h5>
        <div className="form-add-body">
          <div className="mg-4">
            <Label for="exampleName">ID</Label>
            <Input 
              type="text" 
              name="id" 
              value={dataForm.id || ""}
              onChange={({target}) => setDataForm({ ...dataForm, id: +target.value})} 
            />                      
          </div>
          <div className="mg-4">
            <Label for="exampleName">Username</Label>
            <Input 
              type="name" 
              name="username" 
              value={dataForm.username || ""}
              onChange={({target}) => setDataForm({ ...dataForm, username: target.value})} 
            />                      
          </div>
          <div className="mg-4">
            <Label for="exampleName">Password</Label>
            <Input 
              type="password" 
              name="username" 
              value={dataForm.password || ""}
              onChange={({target}) => setDataForm({ ...dataForm, password: target.value})} 
            />                      
          </div>
          <div className="mg-4">
            <Label for="exampleName">Role</Label>
            <Input 
              type="text" 
              name="role" 
              value={dataForm.role || ""}
              onChange={({target}) => setDataForm({ ...dataForm, role: target.value})} 
            />                      
          </div>
          <div>
            <Button
            color="success"
            onClick={titleForm === "Add User" ? saveAddUser : saveEditUser }
            >
              Save
            </Button>
            <Button
            color="secondary"
            onClick={onCloseForm}
            className="mg-l-3"
            >Cancel</Button>
          </div>
        </div>
        </Card>

      </Collapse>

      {/*========= Table Display List User ==========*/}
      <Table bordered striped >
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{ user.id }</td>
                  <td className="circle">{ user.username.slice(0,1).toUpperCase() }</td>
                  <td>{ user.username }</td>
                  <td>{ user.role }</td>
                  <td>
                    <Button
                    color="warning"
                    onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>

                    <Button
                      color="danger"
                      className="mg-l-3"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export {ManageUser};
