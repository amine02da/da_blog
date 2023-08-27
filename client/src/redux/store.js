import { configureStore } from "@reduxjs/toolkit"
import PostsSlice from "./PostsSlice"
import CategoriesSlice from "./CategoriesSlice"
import UserSlice from "./User"

export const store = configureStore({
    reducer:{
        posts: PostsSlice,
        categories: CategoriesSlice,
        user: UserSlice
    }
})