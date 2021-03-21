import * as React from "react";
import { connect } from "react-redux";
import { history } from "../../redux/history";
import { loginUser } from "../../redux/actions/user-actions";
import './LoginPage.scss'
import '../../styles/variables.scss';
import Button from '@material-ui/core/Button';

interface LoginPageState {
    username: string;
    password: string;
    error: boolean;
}

interface LoginPageProps {
    loggedUser: number;
    loginUser: (username: string, password: string) => object;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false
        };
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.loggedUser !== this.props.loggedUser) {
            if (this.props.loggedUser) {
                history.push('/home');
            } else {
                this.setState({ error: true })
            }
        }
    }

    handleTextChange = (e: any) => e.target.name === 'username' ? this.setState({ username: e.target.value }) : this.setState({ password: e.target.value });

    handleLogin = () => {
        this.props.loginUser(this.state.username, this.state.password);
        this.setState({
            username: "",
            password: ""
        });
    };

    goToRegisterPage() {
        history.push('/register');
    }

    render() {
        return (
            <div>
                <div className="form-container">
                    <h1 className="login-title">Login in the Wallet App</h1>
                    <input
                        className="input"
                        name="username"
                        onChange={this.handleTextChange}
                        placeholder={"Username"}
                        value={this.state.username}
                    />
                    <input
                        className="input"
                        type="password"
                        name="password"
                        onChange={this.handleTextChange}
                        placeholder={"Password"}
                        value={this.state.password}
                    />
                    <Button variant="contained" onClick={this.handleLogin} color="primary">Login </Button>
                    <div className="register">
                        {this.state.error && <span className="error-message">Your credentials are wrong</span>}
                        <span>Don't have an account yet?</span>
                        <Button href="#text-buttons" onClick={this.goToRegisterPage} color="primary">Register</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const MapStateToProps = (store: any) => {
    return {
        loggedUser: store.userReducer.loggedUser
    };
};

const MapDispatchToProps = {
    loginUser
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(LoginPage);