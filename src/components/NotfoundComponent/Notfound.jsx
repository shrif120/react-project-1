import React, { Component } from 'react'


export default class Notfound extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className='vh-100 text-dark d-flex justify-content-center align-items-center'>
                    <h1>404 page Not found </h1>
                </div>
            </React.Fragment>
        )
    }
}
