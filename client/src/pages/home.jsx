import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Search } from "../components/Search";
import { Filter } from "../components/Filter";
import { Cards } from "../components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { get_posts } from "../redux/PostsSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const { posts, updated_post, loading, error } = useSelector(state => state.posts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_posts())

    }, [dispatch])


    return (
        <>
            <NavBar />
            <Search />
            <div className="container">

            <div className="row g-0 mt-4 d-flex">
                <div className="col-sm-6 col-md-2">
                    <Filter />
                </div>
                <div className="col-6 col-md-10 gap-4 d-flex flex-wrap">
                    {
                        loading ? 
                            <div class="spinner-grow" style={{ color:"#004aad "}} role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div> 
                                : updated_post?.map(p => {
                                return (
                                    <Cards post = {p}/>
                                )
                            }) 
                    }
                        {error && <div class="alert alert-danger" role="alert">
                            A connection problem has occurred !
                        </div>}
                </div>
            </div>
            </div>
        </>
    )
}