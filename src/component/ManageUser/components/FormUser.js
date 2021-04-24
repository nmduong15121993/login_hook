import React from "react";
import { Button, Collapse, Label, Input, Card } from "reactstrap";

class FormUser extends React.PureComponent {
  constructor(props) {
    super(props);
    const { formInit, titleForm } = props;
    this.state = {
      id: formInit.id,
      username: formInit.username,
      password: formInit.password,
      role: formInit.role,
      titleForm,
      isOpen: false,
    }
  }

  updateState(key, value, isToggle = false) {
    if (isToggle) {
      this.setState({ [key]: !this.state[key] })
    } else {
      this.setState({ [key]: value });
    }
  }

  onSave = () => {
    const dataSave = this.state;
    delete dataSave.isOpen;
    this.props.onSave(dataSave);
  }

  render() {
    const {
      id,
      username,
      password,
      role,
      isOpen,
      titleForm,
    } = this.state;
    return (
      <>
        <Button
            className="mg-4"
            color="info"
            onClick={() => this.updateState('isOpen', true)}
          >
          Add User
        </Button>

        <Collapse isOpen={isOpen}>
          <Card style={{ width: "300px" }}>
            <h5 className="card-form-add">{titleForm}</h5>
            <div className="form-add-body">
              <div className="mg-4">
                <Label for="exampleName">ID</Label>
                <Input
                  type="number"
                  name="id"
                  value={id}
                  onChange={({ target }) => this.updateState('id', +target.value)}
                />
              </div>
              <div className="mg-4">
                <Label for="exampleName">Username</Label>
                <Input
                  type="name"
                  name="username"
                  value={username}
                  onChange={({ target }) => this.updateState('username', target.value)}
                />
              </div>
              <div className="mg-4">
                <Label for="exampleName">Password</Label>
                <Input
                  type="password"
                  name="username"
                  value={password}
                  onChange={({ target }) => this.updateState('password', target.value)}
                />
              </div>
              <div className="mg-4">
                <Label for="exampleName">Role</Label>
                <Input
                  type="text"
                  name="role"
                  value={role}
                  onChange={({ target }) => this.updateState('role', target.value)}
                />
              </div>
              <div>
                <Button
                  color="success"
                  onClick={this.onSave}
                >
                  Save
                </Button>
                <Button color="secondary" onClick={() => this.updateState('isOpen', false)} className="mg-l-3">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </Collapse>
      </>
    );
  }
}

export { FormUser };
