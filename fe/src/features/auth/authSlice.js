import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../services/authService";


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({email, password}, {rejectWithValue}) => {
        try{
            const data = await login(email, password)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            return data
        }catch(err){
            // console.log(err);
            const msg = err.response.data?.message || "Login failed";
            return rejectWithValue({message: msg});
        }
    }
)
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async({name, email, password}, {rejectWithValue}) => {
        try{
            const data = await register(name, email, password)
            return data
        }catch(err){
            console.log(err);
            const msg = err.response.data?.error || "Register failed";
            return rejectWithValue({message: msg});
        }
    }
)

const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const token = localStorage.getItem("token") || null;

const initialState = {
    user: user ? user : null,
    token: token ? token : null,
    isAuthenticated: !!token,
    isLoading: false,
    isError: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
                state.isLoading = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
    }
})

export default authSlice.reducer

export const { logout } = authSlice.actions;

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const dataToken = (state) => state.auth.token;
export const dataUser = (state) => state.auth.user;
