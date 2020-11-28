import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import PrivateRoute from './hoc/PrivateRoute';
import UserPage from './components/user-page/UserPage';
import Login from './components/login/Login';
import SignUp from './components/sign-up/SignUp';

function App(props) {

  return (
      <div>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <PrivateRoute path="/" auth={localStorage.getItem('loggedIn') ? true : false} component={UserPage} />
        <Redirect to ="/login" />
      </div>
  );
}

const mapStateToProps = state => {
    return {
        loggedIn: state.currentUser.loggedIn
    }
}

export default connect(mapStateToProps)(App)
