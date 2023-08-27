import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import login from "../assets/imgs/login.png"
import profile from "../assets/imgs/profile.avif"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register_user } from "../redux/User";

export const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user_login, user_register } = useSelector(state => state.user)


    useEffect(() => {
        const res = localStorage.getItem("dablog_user")
        if (JSON.parse(res)) {
            navigate("/")
        }
    }, [user_login, user_register])
    const handleRegister = (e) => {
        e.preventDefault()



        const image = e.target[0].files[0]
        const name = e.target[1].value
        const email = e.target[2].value
        const password = e.target[3].value

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("image", image)


        try{
            dispatch(register_user(formData))
            navigate("/")
        }catch(e) {
            console.log(e);
        }
    }


    return(
            <div class="container d-flex justify-content-center align-items-center min-vh-100">
                <div class="row rounded p-3 bg-white shadow box-area">
                    <div class="col-md-6 left-box rounded-4  ">
                        <div class="image">
                            <img src={login} class=" rounded img-fluid" />
                        </div>
                    </div>
                    <div class="col-md-6 right-box align-items-center m-auto">
                        <div class="row">
                        <form onSubmit={(e) => { handleRegister(e)}}>
                            <div class="input-group mb-3 d-flex justify-content-center">
                                <input type="file" hidden name="file" id="profile" class="form-control form-control-lg bg-light fs-6" />
                                <label htmlFor="profile">
                                    <img className="rounded-circle" src={profile} alt="" width={"100px"} height={"100px"} />
                                </label>
                            </div>
                                <div class="input-group mb-3">
                                    <input type="text" name="name" class="form-control form-control-lg bg-light fs-6" placeholder="Name" />
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" name="email" class="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password" name="password" class="form-control form-control-lg bg-light fs-6" placeholder="Password" />
                                </div>
                                <div class="input-group">
                                    <button type="submit" class="btn btn-lg btn-primary w-50 fs-6">Register</button>
                                </div>
                                <div class="mb-3">
                                    <p>You do have an account? <Link to="/login">Login</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div >
    )
    
}