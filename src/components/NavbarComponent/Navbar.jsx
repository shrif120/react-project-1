import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import navStyle from './NavStyle.module.css'
export default class Navbar extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className={`${navStyle.font} ${navStyle.position} `}>
                    <nav className={`${navStyle.mainColor} navbar navbar-expand-lg navbar-dark`}>
                        <a className="navbar-brand" href="/">Last news</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <NavLink className={`${navStyle.change} nav-link`} to="/login"  >Login <span className="sr-only">(current)</span></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`${navStyle.change} nav-link`} to="/register">Register</NavLink>
                                </li>

                            </ul>

                        </div>
                    </nav>
                </div>
            </React.Fragment >
        )
    }
}
