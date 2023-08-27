import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import logo from "../assets/imgs/logo.png"
import { Cards } from "../components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { get_user_posts } from "../redux/PostsSlice";
import { useParams } from "react-router-dom";


export const MyPosts = () =>{

    const { user_posts } = useSelector(state => state.posts)
    const [current_user, setCurrent_user] = useState()


    const  {user_id} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        const res = localStorage.getItem("dablog_user")
        setCurrent_user(JSON.parse(res))

        dispatch(get_user_posts(user_id))
        
    }, [dispatch])

    console.log(user_posts);
    
    return (
        <>
            <NavBar/>
            <div className="profile row mt-4 container">
                <div className="col-2"></div>
                <div className="col-4 d-flex">
                    <div>
                        <img src={`http://localhost:4000/images/${current_user?.image}`}  className="rounded-circle" width={"120px"} height={"120px"}/>
                    </div>
                    <div className="d-flex flex-column m-3">
                        <h3>{current_user?.name}</h3>
                        <h5>{current_user?.email}</h5>
                    </div>
                </div>
                <div className="col-2"></div>
                <div className="col-4 mt-4">
                    <div className="d-flex"><h3>{user_posts?.length}</h3> <p className="mt-2">post</p></div>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3 mt-5 justify-content-evenly">
            {user_posts && user_posts.map((up) => (
                <Cards post = {up}/>
                ))}
            </div>
        </>
    )
} 