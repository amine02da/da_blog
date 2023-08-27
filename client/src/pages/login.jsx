import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import login from "../assets/imgs/login.png"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login_user } from "../redux/User";

export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user_login, user_register } = useSelector(state => state.user)


    useEffect(() => {
        const res = localStorage.getItem("dablog_user")
        if (JSON.parse(res)) {
            navigate("/")
        }
    }, [user_login, user_register])

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        try{
            dispatch(login_user({email, password}))
            navigate("/")

        }catch(e) {
            console.log(e);
        }
    }
    return (
            <div class="container d-flex justify-content-center align-items-center min-vh-100">
                <div class="row rounded p-3 bg-white shadow box-area">
                    <div class="col-md-6 left-box rounded-4  ">
                        <div class="image">
                            <img src={login} class=" rounded img-fluid" />
                        </div>
                    </div>
                    <div class="col-md-6 right-box align-items-center m-auto">
                        <div class="row">
                            <form onSubmit={ (e) => handleLogin(e)}>
                            <div class="input-group mb-3">
                                <input type="text" name="email" class="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" name="password" class="form-control form-control-lg bg-light fs-6" placeholder="Password" />
                            </div>
                            <div class="input-group">
                                <button type="submit" class="btn btn-lg btn-primary w-50 fs-6">Login</button>
                            </div>
                                <div class="mb-3">
                                    <p>You don't have an account? <Link to="/register">Register</Link></p>
                                </div>
                        </form>
                    </div>
                </div>
            </div>

        </div >

    )
}