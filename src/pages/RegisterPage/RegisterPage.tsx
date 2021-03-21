import * as React from "react";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions/user-actions";
import { history } from "../../redux/history";
import Button from '@material-ui/core/Button';
import { User } from "../../models/userModel";

interface RegisterPageState {
  username: string;
  password: string;
}

interface RegisterPageProps {
  users: User[];
  addUser: (username: string, password: string) => object;
}

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
  constructor(props: RegisterPageProps) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleTextChange = (e: any) => e.target.name === 'username' ? this.setState({ username: e.target.value }) : this.setState({ password: e.target.value });

  handleConfirm = () => {
    this.props.addUser(this.state.username, this.state.password);
    history.push('/login');
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <div className="form-container">
          <h1>Register in the App</h1>
          <input className="input"
            name="username"
            onChange={this.handleTextChange}
            placeholder={"Username"}
            value={this.state.username}
          />
          <input className="input"
            name="password"
            type="password"
            onChange={this.handleTextChange}
            placeholder={"Password"}
            value={this.state.password}
          />
          <Button variant="contained" onClick={this.handleConfirm} color="primary">CONFIRM</Button>
        </div>
      </div>
    );
  }
}

const MapDispatchToProps = {
  addUser
};

export default connect(
  null,
  MapDispatchToProps
)(RegisterPage);