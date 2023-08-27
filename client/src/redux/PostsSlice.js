import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// GET ALL POSTS
export const get_posts = createAsyncThunk("posts/get", async () => {
    const posts_res = await axios.get("http://localhost:4000/posts")
    return posts_res.data
})

// GET SINGLE POST
export const get_post = createAsyncThunk("post/get", async (id) => {
    const post_res = await axios.get(`http://localhost:4000/posts/${id}`)
    return post_res.data
})

// CREATE POST 
export const create_post = createAsyncThunk("posts/create", async(post) => {
    await axios.post(`http://localhost:4000/posts`,post)
})

// UPDATE POST 
export const update_post = createAsyncThunk("posts/update", async({id, post}) => {
    await axios.put(`http://localhost:4000/posts/${id}`,post)
})

// DELETE POST
export const delete_post = createAsyncThunk("post/delete", async (id) => {
    await axios.delete(`http://localhost:4000/posts/${id}`)
})

// GET USER POSTS  
export const get_user_posts = createAsyncThunk("post/user_posts", async (user_id) => {
    const res = await axios.get(`http://localhost:4000/posts/user/${user_id}`)
    return res.data
})

const PostSlice = createSlice({
    name:"Posts",
    initialState: {
        posts: [],
        post: [],
        user_posts: [],
        user_posts_with_cate: [],
        updated_post: [],
        loading: false,
        error: false
    },

    reducers: {
        filter_posts_by_category : (state, action) => {
            state.updated_post = action.payload
        },
        search_post : (state, action) => {
            state.updated_post = action.payload
        }
    },

    extraReducers: (builder) => {
        // GET ALL POSTS
        builder.addCase(get_posts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(get_posts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
            state.updated_post = action.payload
        })
        builder.addCase(get_posts.rejected, (state) => {
            state.loading = false
            state.error = true
        })

        // GET SINGLE POST
        builder.addCase(get_post.pending, (state) => {
            state.loading = true
        })

        builder.addCase(get_post.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload
        })

        builder.addCase(get_post.rejected, (state) => {
            state.loading = false
            state.error = true
        })
        // GET USER POSTS
        builder.addCase(get_user_posts.pending, (state) => {
            state.loading = true
        })

        builder.addCase(get_user_posts.fulfilled, (state, action) => {
            state.loading = false
            state.user_posts = action.payload
        })

        builder.addCase(get_user_posts.rejected, (state) => {
            state.loading = false
            state.error = true
        })
        
    }

})

export const { filter_posts_by_category, search_post }  = PostSlice.actions
export default PostSlice.reducer