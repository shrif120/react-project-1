import React, { Component } from 'react'
import style from './LoginStyle.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import SecureLS from 'secure-ls'
var ls = new SecureLS({ encodingType: 'aes' });
export default class Login extends Component {
    state = { errorMessage: "" }
    user = {
        email: "",
        password: ""
    }
    getFormData = (e) => {
        this.user[e.target.name] = e.target.value
        // console.log(this.user);
    }
    sendData = async (e) => {
        e.preventDefault();
        let { data: response } = await axios.post("https://route-egypt-api.herokuapp.com/signin", this.user);
        // console.log(response);
        if (response.message === "success") {
            const notify = () => toast("success");
            notify();
            ls.set("token", response.token)
            this.props.isAuth(true)
            this.props.history.replace('/home');
        } else {
            const notify = () => toast("check the Error!");
            notify();
            this.setState({ errorMessage: response.message })
        }
    }
    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <div className={`${style.font}  vh-100 d-flex justify-content-center align-items-center `}>


                    <form onSubmit={this.sendData} className="w-50">
                        <div className='mb-5'>
                            <h1 className="text-white">Login Now</h1>
                        </div>
                        <div className="form-group">
                            <input onKeyUp={this.getFormData} name="email" type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your Email" />
                        </div>
                        <div className="form-group">
                            <input onKeyUp={this.getFormData} name="password" type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter your password" />
                        </div>

                        {this.state.errorMessage && <div className="alert alert-danger text-center my-2">{this.state.errorMessage}</div>}

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>




                </div>
            </React.Fragment>
        )
    }
}
