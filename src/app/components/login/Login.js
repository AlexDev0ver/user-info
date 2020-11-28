import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";

import { login } from '../../redux/actions';

class Login extends React.Component {
    state = {
        name: null,
        password: null
    }

    onLogin(e) {
        e.preventDefault();

        this.props.login(this.state.name, this.state.password);
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <form
                className="d-flex flex-column justify-content-center col-12 col-sm-4 offset-sm-4"
                style={{height:window.innerHeight}}
                onSubmit={(e) => this.onLogin(e)}>
                <div className="d-flex justify-content-center">
                    <h2>Please, login</h2>
                </div>
                <div className="my-1">
                    <input
                        placeholder="username"
                        style={{width:"100%"}}
                        type="text"
                        onChange={(e) => this.setState({name: e.target.value})}
                        required/>
                </div>
                <div className="my-1">
                    <input
                        placeholder="password"
                        style={{width:"100%"}}
                        type="password"
                        onChange={(e) => this.setState({password: e.target.value})}
                        required/>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-1">
                    <input type="submit" onSubmit={(e) => this.onLogin(e) } value="Login" />
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/sign-up" style={{textDecoration:"none", color:"#2c3033"}}><p>Sign Up</p></Link>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.currentUser.loggedIn
    }
}

export default connect(mapStateToProps, { login })(Login);
