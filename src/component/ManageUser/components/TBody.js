import React from 'react';
import { Button } from "reactstrap";

const TBody = ({ handleActionUser, init }) => {
  const { id, username, role } = init;
  return (
    <tr>
      <td>{ id }</td>
      <td className="circle">{ username.slice(0,1).toUpperCase() }</td>
      <td>{ username }</td>
      <td>{ role }</td>
      <td>
        <Button
        color="warning"
        onClick={() => handleActionUser('EDIT')}
        >
          Edit
        </Button>

        <Button
          color="danger"
          className="mg-l-3"
          onClick={() => handleActionUser('DELETE')}
        >
          Delete
        </Button>
      </td>
    </tr>      
  )
}

export { TBody } ;
