import React from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from "reactstrap";

const Header = ({handleActionUser}) => {
  const history = useHistory();

  return (
    <div>
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
    </div>
  )
}

export { Header };
