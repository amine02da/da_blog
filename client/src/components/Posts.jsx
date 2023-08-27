import React from "react";
import { Link } from "react-router-dom";

export const Cards = ({ post }) =>{
    return (
        <div className="card border-0 shadow" style={{width:"18rem"}}>
            <img src={`http://localhost:4000/images/${post.image}`} className="card-img-top" alt="..." height={"230px"}/>
                <div className="card-body">
                    <Link className="card-title nav-link fs-3" to={`/post/${post._id}`}>{post.title}</Link>
                    <p className="card-text">{post.description.substr(0,110)+"..."}</p>
                    <Link to={`/post/${post._id}`} className="btn btn text-white" style={{ backgroundColor: "#004AAD" }}>Show more</Link>
                </div>
        </div>
    )
}