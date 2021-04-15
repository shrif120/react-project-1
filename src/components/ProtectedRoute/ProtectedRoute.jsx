import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import SecureLS from 'secure-ls'
var ls = new SecureLS({ encodingType: 'aes' });
class ProtectedRoute extends Component {
    render() {
        let token = ls.get("token");
        try {
            var decoded = jwt_decode(token);
            console.log(decoded);
        } catch (error) {
            localStorage.clear();
            return (<Redirect to='/login' />);
        }

        if (this.props.isAuth === true || token) {
            return (
                <Route {...this.props} />
            );
        } else {
            return (<Redirect to='/login' />);
        }

    }
}

export default ProtectedRoute;
