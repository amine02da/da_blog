import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { create_post } from "../redux/PostsSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { get_categroies } from "../redux/CategoriesSlice";

export const Create_post = () => {

    const { categories } = useSelector(state => state.categories)
    const { user_login, user_register } = useSelector(state => state.user)
    const [current_user, setCurrent_user] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(get_categroies())
        const res = localStorage.getItem("dablog_user")
        setCurrent_user(JSON.parse(res))
        if (JSON.parse(res) == null) {
            navigate("/login")
        }
    },[dispatch,user_login ,user_register])

    const handleSubmit = (e) => {
        e.preventDefault()
        const title = e.target[0].value
        const description = e.target[1].value
        const category = e.target[2].value
        const image = e.target[3].files[0]
        const user_id = current_user._id

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("image", image)
        formData.append("user_id", user_id)

        const post = {
            title,
            description,
            category,
            image,
            user_id,
        }

        if(title == ""){
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'the title field is required !',
            })
        }else {
            dispatch(create_post(formData))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your post has been created',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/")
        }
        
    } 
    return (
        <>
            <NavBar/>
            <div className="container shadow p-5 rounded mt-5" style={{width:"70%"}}>
                <form onSubmit={(e) => handleSubmit(e)} enctype="multipart/form-data">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="title" placeholder="name@example.com"/>
                        <label for="title">Title</label>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a Description here" id="description"></textarea>
                        <label for="description">Description</label>
                    </div>
                    <select class="form-select mt-3" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        {categories && categories.map((cate) => (
                            <option value={cate.name}>{cate.name}</option>
                        ))}
                    </select>
                    <div className="mt-3">
                        <input class="form-control form-control-lg" id="formFileLg" type="file" />
                    </div>
                    <button type="submit" class="btn btn mt-3 text-white" style={{ backgroundColor:"#004aad"}}>Create</button>
                </form>
            </div>
        </>

    )
}