import * as React from 'react';
import { connect } from 'react-redux';

import { getUser, logout } from '../../redux/actions';

class UserPage extends React.Component {

    componentDidMount() {
        this.props.getUser();
    }


    render() {

        const { user } = this.props;
        return(
            <div className="d-flex flex-column col-10 offset-1 col-sm-4 offset-sm-4 border-left border-right align-items-center" style={{height:"100vh"}}>
                {user &&
                    <ul className="d-flex flex-column w-100 align-items-between" style={{listStyle: "none", margin: "auto", padding:"0"}}>
                        <div className="align-self-center">
                            <img style={{maxWidth:"150px", maxHeight:"150px", border:"1px solid #000"}} src={user.avatar} alt="avatar"/>
                        </div>
                        <li className="d-flex justify-content-between border-bottom">
                            <div>Name:</div>
                            <div>{user.name}</div>
                        </li>
                        <li className="d-flex justify-content-between border-bottom">
                            <div>Surname:</div>
                            <div>{user.surname}</div>
                        </li>
                        <li className="d-flex justify-content-between border-bottom">
                            <div>Email:</div>
                            <div>{user.email}</div>
                        </li>
                        <li className="d-flex justify-content-between border-bottom">
                            <div>Username:</div>
                            <div>{user.username}</div>
                        </li>
                        <li className="d-flex justify-content-between mb-4">
                            <div>Phone:</div>
                            <div>{user.phone}</div>
                        </li>
                        <button className="w-50 align-self-center" onClick={() => this.props.logout()}>Log Out</button>
                    </ul>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.currentUser.user,
        loggedIn: state.currentUser.loggedIn
    }
}

export default connect(mapStateToProps, { getUser, logout })(UserPage);
