import React, { Component } from 'react'
import style from './RegisterStyle.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Joi from 'joi'
export default class Register extends Component {

    state = { error: [] }
    user = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        age: "",

    }

    schema = Joi.object({
        first_name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        last_name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        age: Joi.number()
            .integer()
            .min(10)
            .max(95)
    })

    getFormData = (e) => {
        this.user[e.target.name] = e.target.value;
        // console.log(this.user);
    }


    sendData = async (e) => {
        e.preventDefault(); // very important
        let validationResult = this.schema.validate(this.user, { abortEarly: false });
        console.log(validationResult);
        if (validationResult.error) {
            this.setState({ error: validationResult.error.details })
            const notify = () => toast("check the Error!");
            notify();
        } else {
            const notify = () => toast("succes");
            notify();
            let { data: response } = await axios.post("https://route-egypt-api.herokuapp.com/signup", this.user)
            console.log(response);
            this.props.history.push('/login')
        }

    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <div className={`${style.font} d-flex flex-coulmn justify-content-center align-items-center `}>
                    <form onSubmit={this.sendData} className="w-50 py-5 ">
                        <div className='py-5'>
                            <h1 className="text-white">Register Now</h1>
                        </div>
                        <div className="form-group">
                            <input onKeyUp={this.getFormData} name="first_name" type="text" className="form-control" placeholder="Enter your first Name" />
                            {this.state.error.find((e) => e.path[0] === "first_name") ? <div className='alert alert-danger mt-3'>invalid name</div> : null}
                        </div>
                        <div className="form-group">
                            <input onKeyUp={this.getFormData} name="last_name" type="text" className="form-control" placeholder="Enter your last Name" />
                            {this.state.error.find((e) => e.path[0] === "last_name") ? <div className='alert alert-danger mt-3'>invalid name</div> : null}
                        </div>
                        <div className="form-group">
                            <input onKeyUp={this.getFormData} name="email" type="email" autoComplete="username" className="form-control" placeholder="Enter your Email" />
                            {this.state.error.find((e) => e.path[0] === "email") ? <div className='alert alert-danger mt-3'>invalid email</div> : null}
                        </div>
                        <div className="form-group">
                            <input onKeyUp={this.getFormData} name="password" type="password" autoComplete="current-password" className="form-control" placeholder="Enter your password" />
                            {this.state.error.find((e) => e.path[0] === "password") ? <div className='alert alert-danger mt-3'>invalid password</div> : null}
                        </div>
                        <div className="form-group">
                            <input onKeyUp={this.getFormData} name="age" type="number" className="form-control" placeholder="Enter your age" />
                            {this.state.error.find((e) => e.path[0] === "age") ? <div className='alert alert-danger mt-3'>invalid age</div> : null}
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                </div>

            </React.Fragment>
        )
    }
}
