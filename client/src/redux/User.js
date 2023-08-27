import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login_user = createAsyncThunk("user/login", async (user) => {

    const res = await axios.post("http://localhost:4000/user/login", user)
    localStorage.setItem("dablog_user", JSON.stringify(res.data))
    return res.data
})

export const register_user = createAsyncThunk("user/register", async (user) => {

    const res = await axios.post("http://localhost:4000/user/register", user)
    localStorage.setItem("dablog_user", JSON.stringify(res.data))
    return res.data
})

export const UserSlice = createSlice({
    
    name: "users",
    initialState:{
        loading: false,
        error:false,
        user_login:{},
        user_register:{},
    },


    extraReducers: (builder) => {

        // LOGIN
        builder.addCase(login_user.pending, (state) => {
            state.loading = true
        })
        builder.addCase(login_user.fulfilled, (state, action) => {
            state.loading = false
            state.user_login = action.payload
        })
        builder.addCase(login_user.rejected, (state) => {
            state.loading = false
            state.error = true
        })

        // REGISTER
        builder.addCase(register_user.pending, (state) => {
            state.loading = true
        })
        builder.addCase(register_user.fulfilled, (state, action) => {
            state.loading = false
            state.user_register = action.payload
        })
        builder.addCase(register_user.rejected, (state) => {
            state.loading = false
            state.error = true
        })
    }

})

export const { } = UserSlice.actions
export default UserSlice.reducer