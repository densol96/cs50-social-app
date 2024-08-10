import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jwt: localStorage.getItem("jwt") || null,
    authenticated:false,
    serverCalled: false,
    user: undefined // {fullName, email} expected
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:  {
        initApp (state, action){
            state.authenticated = action.payload.authenticated;
            state.serverCalled = action.payload.serverCalled;
            state.user = action.payload.user;
        },
        saveJwt(state, action) {
            state.jwt = action.payload;
        },
        logout(state, action) {
            state.jwt = "invalid";
        }
    }
});

export const { initApp, saveJwt, logout } = authSlice.actions;

export default authSlice.reducer;