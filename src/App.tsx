
import { Redirect, Route, Router, Switch } from 'react-router';
import '../src/styles/App.scss'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { history } from './redux/history';
import { PrivateRoute } from './components/Route/privateRoute'
import React from 'react';
import { connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


interface AppProps {
  loggedUser: number;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#85C1E9',
      contrastText: "#fff"
    },
    secondary: {
      main: '#5499C7'
    },
    
  },
});

class App extends React.Component<AppProps> {

  render() {

    return (
      <MuiThemeProvider theme={theme}>
   <div className="App">
        <Router history={history}>
          <Switch>
            <PrivateRoute
              path='/home'
              isAuthenticated={this.props.loggedUser}
              component={HomePage}
            />
            <Route exact path="/" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    </MuiThemeProvider>
      
    );
  }
}

function MapStateToProps(state: any) {
  const { loggedUser } = state.userReducer;
  return { loggedUser };
}



export default connect(
  MapStateToProps,
)(App);








