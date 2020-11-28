import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";

import { signUp } from '../../redux/actions';

class SignUp extends React.Component {
    state = {
        name: null,
        surname: null,
        password: null,
        email: null,
        phone: null,
        success: false
    }

    onSignUp(e) {
        e.preventDefault();

        const { name, surname, password, email, phone } = this.state;
        this.props.signUp(email, password, phone, name, surname).then(res => {
            alert("Success!")
            this.setState({success: true})
        })

    }

    render() {
        if (this.props.loggedIn) {
            return (
                <Redirect to="/" />
            )
        }

        if (this.state.success) {
            return (
                <Redirect to="/login" />
            )
        }

        return (
            <form
                className="d-flex flex-column justify-content-center col-12 col-sm-4 offset-sm-4"
                style={{height:window.innerHeight}}
                onSubmit={(e) => this.onSignUp(e)}>

                <div className="d-flex justify-content-center">
                    <h2>Please, sign up</h2>
                </div>
                <div className="my-1">
                    <input
                        placeholder="name"
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
                <div className="my-1">
                    <input
                        placeholder="surname"
                        style={{width:"100%"}}
                        type="text"
                        onChange={(e) => this.setState({surname: e.target.value})}
                        required/>
                </div>
                <div className="my-1">
                    <input
                        placeholder="phone"
                        style={{width:"100%"}}
                        maxLength="30"
                        title="+x (xxx) xxx-xx-xx"
                        type="tel"
                        onChange={(e) => this.setState({phone: e.target.value})}
                        required/>
                </div>
                <div className="my-1">
                    <input
                        placeholder="email"
                        style={{width:"100%"}}
                        type="email"
                        title="example@smth.com"
                        onChange={(e) => this.setState({email: e.target.value})}
                        required/>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-1">
                    <input type="submit" onSubmit={(e) => this.onSignUp(e) } value="Sign Up" />
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/login" style={{textDecoration:"none", color:"#2c3033"}}><p>Back to login</p></Link>
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

export default connect(mapStateToProps, { signUp })(SignUp);
