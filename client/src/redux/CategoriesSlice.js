import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const get_categroies = createAsyncThunk("categories/get", async () => {
    const categories_res = await axios.get("http://localhost:4000/categories")
    return categories_res.data
})

export const CategoriesSlice = createSlice({
    name:"categories",

    initialState: {
        categories: [],
        loading:false,
        error: false
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(get_categroies.pending, (state) => {
            state.loading = true
        })
        builder.addCase(get_categroies.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
        })
        builder.addCase(get_categroies.rejected, (state) => {
            state.loading = false
            state.error = true
        })
    }
})

export const {} = CategoriesSlice.actions
export default CategoriesSlice.reducer