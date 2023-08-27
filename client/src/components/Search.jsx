import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_post, search_post } from "../redux/PostsSlice";

export const Search = () => {

    const [ search, setSearch ] = useState("")
    const { posts } = useSelector(state => state.posts)
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        const newSearch = e.target.value
        setSearch(newSearch)

        if(posts.length == 0) {

            dispatch(get_post())
        }
        console.log(posts.length);
        const res = posts.filter(p => p.title.toLowerCase().includes(search))
        dispatch(search_post(res))
    }
    

    return (
        <form className="d-flex container mt-3" style={{width:"20rem"}} role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearch(e)}/>
            <i class="bi bi-search fs-5 mt-1" style={{ color:"#004AAD"}}></i>        
        </form>
    )
}