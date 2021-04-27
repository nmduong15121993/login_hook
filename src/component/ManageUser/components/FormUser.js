import React from "react";
import { Button, Collapse, Label, Input, Card } from "reactstrap";

const FormUser = ({ isOpen, titleForm, dataForm, setDataForm, onCloseForm, saveFormUser }) => {
  return (
    <Collapse isOpen={isOpen}>
      <Card style={{ width: "300px" }}>
        <h5 className="card-form-add">{titleForm}</h5>
        <div className="form-add-body">
          <div className="mg-4">
            <Label for="exampleName">ID</Label>
            <Input
              type="text"
              name="id"
              value={dataForm.id || ""}
              onChange={({ target }) => setDataForm({ ...dataForm, id: +target.value })}
            />
          </div>
          <div className="mg-4">
            <Label for="exampleName">Username</Label>
            <Input
              type="name"
              name="username"
              value={dataForm.username || ""}
              onChange={({ target }) => setDataForm({ ...dataForm, username: target.value })}
            />
          </div>
          <div className="mg-4">
            <Label for="exampleName">Password</Label>
            <Input
              type="password"
              name="username"
              value={dataForm.password || ""}
              onChange={({ target }) => setDataForm({ ...dataForm, password: target.value })}
            />
          </div>
          <div className="mg-4">
            <Label for="exampleName">Role</Label>
            <Input
              type="text"
              name="role"
              value={dataForm.role || ""}
              onChange={({ target }) => setDataForm({ ...dataForm, role: target.value })}
            />
          </div>
          <div>
            <Button
              color="success"
              onClick={saveFormUser}
            >
              Save
            </Button>
            <Button color="secondary" onClick={onCloseForm} className="mg-l-3">
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </Collapse>
  );
};

export { FormUser };
