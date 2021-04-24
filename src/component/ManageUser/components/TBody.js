import React from 'react';
import { Button } from "reactstrap";

const TBody = ({ allUser, handleActionUser }) => {
  
  const listUser = allUser.map((user) => {
    if(!allUser) return "";

    const idRow = user.id;
    return (
      <tr key={ idRow }>
        <td>{ idRow }</td>
        <td className="circle">{ user.username.slice(0,1).toUpperCase() }</td>
        <td>{ user.username }</td>
        <td>{ user.role }</td>
        <td>
          <Button
          color="warning"
          onClick={() => handleActionUser('EDIT', idRow)}
          >
            Edit
          </Button>

          <Button
            color="danger"
            className="mg-l-3"
            onClick={() => handleActionUser('DELETE', idRow)}
          >
            Delete
          </Button>
        </td>
      </tr>      
    );
  });

  return (
    <tbody>
      { listUser }
    </tbody>
  )
}

export { TBody } ;
