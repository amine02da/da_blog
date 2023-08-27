import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_categroies } from "../redux/CategoriesSlice";
import { filter_posts_by_category, get_posts } from "../redux/PostsSlice";

export const Filter = () => {

    const { categories, loading, error } = useSelector(state => state.categories)
    const { posts, updated_post } = useSelector(state => state.posts)

    

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_categroies())
    }, [dispatch])

    const handle_filter =  (e) => {

        e.preventDefault()
        
        const res = posts.filter((p) => p.category == e.target.value)
        dispatch(filter_posts_by_category(res))
    }
    return (
        <div className="position-fixed shadow p-4 rounded">
            <p><i className="bi bi-bookmark"></i>Categories</p>
            <div className="m-1">
                {categories.map (c => {
                    return (
                        <div>
                            <button className="btn btn" value={c.name} onClick={(e) => { handle_filter(e)}}>{c.name}</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}