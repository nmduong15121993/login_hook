import React, { useEffect, useState } from 'react'
import { Button, Table } from "reactstrap";
import { useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { user } from "../../mooks";
import "../Layout/css/ManageUser.css";

// Component
import { THead } from './components/THead';
import { TBody } from './components/TBody';
import { FormUser } from './components/FormUser';

const ManageUser = () => {
  const history = useHistory();
  const [allUser, setAllUser] = useState([]);
  const [titleForm, setTitleForm] = useState("");
  const [initUser, setInitUser] = React.useState({
    id: null,
    username: "",
    password: "",
    role: ""
  });

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

  const handleActionUser = (action, id) => {
    console.log({ action, id });
    switch (action) {
      case 'EDIT': {

        break;
      }
      case 'DELETE': {

        break;
      }
    
      default:
        break;
    }
  }

  return (
    <div>
      <Button 
        onClick={() => history.push("/")} 
        style={{margin: "4px"}}
      >
        Back Admin POST
      </Button>
      <h1>User List</h1>
      <FormUser 
        formInit={initUser}
        titleForm={titleForm}
        onSave={(newState) => setInitUser(newState)}
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

