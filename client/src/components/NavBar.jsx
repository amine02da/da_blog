import React, { useEffect, useState } from "react"
import logo from "../assets/imgs/blogs.png"
import Slogo from "../assets/imgs/s-logo.png"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export const NavBar = () => {
    const [homeActive, sethomeActive] = useState(true)
    const [AboutActive, setAboutActive] = useState(false)
    const [writeActive, setwriteActive] = useState(false)
    const [contactActive, setcontactActive] = useState(false)
    const [myposts, setMypostsActive] = useState(false)
    const [current_user, setCurrent_user] = useState()

    const { user_login, user_register } = useSelector(state => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        const res = localStorage.getItem("dablog_user")
        setCurrent_user(JSON.parse(res))
        
    }, [user_login,user_register])

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear("dablog_user")
        navigate("/login")
 
    }


    
    const handleActive = (e,linkName) => {
        switch (linkName){
            case "home":
                sethomeActive(true)
                setAboutActive(false)
                setcontactActive(false)
                setwriteActive(false)
                setMypostsActive(false)
                break
            case "about":
                sethomeActive(false)
                setAboutActive(true)
                setcontactActive(false)
                setwriteActive(false)
                setMypostsActive(false)
                break
            case "contact":
                sethomeActive(false)
                setAboutActive(false)
                setcontactActive(true)
                setwriteActive(false)
                setMypostsActive(false)
                break
            case "write":
                sethomeActive(false)
                setAboutActive(false)
                setcontactActive(false)
                setwriteActive(true)
                setMypostsActive(false)
            case "my-posts":
                setMypostsActive(true)
                sethomeActive(false)
                setAboutActive(false)
                setcontactActive(false)
                setwriteActive(false)
                break
        }
    }
    return (
        <nav className="navbar navbar-expand-lg shadow">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    {/* <span className="p-2 shadow rounded" style={{ backgroundColor: "#004AAD", color:"#FF5757"}}>Dablog</span> */}
                    <img src={logo} alt="" height={"50px"} width={"100px"} className="rounded"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                        <li className="nav-item m-1 fs-5" >
                            <Link className={`nav-link ${homeActive && "active"}`} onClick={(e) => handleActive(e, "home")} aria-current="page" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item m-1 fs-5">
                            <Link className={`nav-link ${AboutActive && " active"}`} onClick={(e) => handleActive(e, "about")} href="#">About</Link>
                        </li>
                        <li className="nav-item m-1 fs-5">
                            <Link className={`nav-link ${contactActive && "active"}`} onClick={(e) => handleActive(e, "contact")} href="#">Contact</Link>
                        </li>
                        <li className="nav-item m-1 fs-5">
                            {current_user == null ? "" : <Link to={`/my-posts/${current_user?._id}`} className={`nav-link ${writeActive && "active"}`} >Profile</Link>}
                            {/* {current_user == null ? "" : <Link to="/my-posts" className={`nav-link ${writeActive && "active"}`} onClick={(e) => handleActive(e, "my-posts")}>My-posts</Link>} */}
                        </li>
                        <li className="nav-item m-1 fs-5">
                            {current_user == null ? "" : <Link to="/create-post" className={`nav-link ${writeActive && "active"}`} onClick={(e) => handleActive(e, "write")}>Write</Link>}
                        </li>
                    </ul>
                    <div>
                        {
                            current_user == null ? <div className="d-flex">
                                <Link className="nav-link m-1" to={"/login"}>Login</Link>
                                <Link className="nav-link m-1" to={"/register"}>Regsiter</Link>
                            </div> :
                            <>
                                <span className="m-1">{current_user?.name}</span>
                                <button onClick={(e) => handleLogout(e)} className="m-1 btn btn-outline text-white" style={{ backgroundColor:"#FF5757"}}>Logout</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}
