import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import programming from "../assets/imgs/programming.png"
import "../assets/styles/style.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { delete_post, get_post, update_post } from "../redux/PostsSlice";
import Swal from "sweetalert2"

export const Post_details = () => {

    const { post, loading} = useSelector(state => state.posts)
    const [ updateMode, setUpdateMode ] = useState(false)
    const [ title, setTitle ] = useState(post[0]?.title)
    const [ description, setDescription ] = useState("")
    const [ current_user, setCurrent_user ] = useState()

    
    console.log();
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(get_post(id))
        const res = localStorage.getItem("dablog_user")
        setCurrent_user(JSON.parse(res))
    }, [dispatch])

    const handleUpdateMode = (e) => {
        e.preventDefault()
        setUpdateMode(!updateMode)
    }
    
    const handleUpdate = (e) => {
        e.preventDefault()

        const new_post = {
            title:title,
            description:description
        }

        dispatch(update_post({id, post:new_post}))
        setUpdateMode(false)
        navigate("/")
        Swal.fire(
            'Updated!',
            'Your Post has been updated.',
            'success'
        )

    }

    const handle_delete_post = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_post(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                navigate("/")
            }
        })
        
    }
    return(
        <div>
            <NavBar/>
            
            { loading ? <div class="spinner-grow" style={{ color: "#004aad " }} role="status">
                <span class="visually-hidden">Loading...</span>
            </div>  : <div className="container">
                <div className="d-flex justify-content-evenly mt-3">
                        {updateMode ? <div className="d-flex align-items-center "><textarea style={{resize:"none", height:"20px"}} onChange={(e) => setTitle(e.target.value)} class="form-control" placeholder="Leave a comment here" id="title">{post[0]?.title}</textarea> </div> : <h3 className="mt-3 text-center">{post.length > 0 && post[0].title}</h3>}

                        {current_user == null || current_user._id != post[0]?.user_id ? "" :
                        updateMode ? <button onClick={(e) => handleUpdate(e)} className="btn btn-warning">edit</button> : <div className="mt-2">
                            <button className="btn" onClick={(e) => handle_delete_post(e)}><i class="bi bi-trash fs-2 text-danger"></i></button>
                            <button className="btn" onClick={(e) => handleUpdateMode(e)}><i class="bi bi-pencil-square fs-2 text-warning"></i></button>
                        </div> }

                </div>
                <div className="d-flex flex-column mt-3 justify-content-center">
                        <img src={`http://localhost:4000/images/${post[0]?.image}`} class="w-75 rounded m-auto img-fluid" alt="..."></img>
                    <div className="description row">
                        <div className="col-2"></div>
                        <div className="col-8 mt-3">
                                {updateMode ? <div class="form-floating">
                                    <textarea onChange={(e) => setDescription(e.target.value)} class="form-control" placeholder="Leave a comment here" id="floatingTextarea">{post[0]?.description}</textarea>
                                    <label for="floatingTextarea">Description</label>
                                </div> : <p>{post.length > 0 && post[0].description}</p>}
                        </div>
                        <div className="col-2">

                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}