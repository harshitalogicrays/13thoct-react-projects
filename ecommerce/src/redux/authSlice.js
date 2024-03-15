import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:false,userEmail:null,userRole:null,userId:null,userName:null},
    reducers:{
        loginuser(state,action){
            console.log(action.payload)
            let {userEmail,userName,userRole,userId}=action.payload
            state.isLoggedIn=true
            state.userEmail=userEmail
            state.userRole=userRole
            state.userId=userId
            state.userName=userName
        },
        logoutuser(state,action){
            state.isLoggedIn=false 
            state.userEmail=null
            state.userRole=null
            state.userId=null
            state.userName=null
        }
    }
})
export const {loginuser,logoutuser}=authSlice.actions
export default authSlice.reducer

export const selectIsLoggedIn=state=>state.auth.isLoggedIn
export const selectUserEmail=state=>state.auth.userEmail
export const selectUserName=state=>state.auth.userName
export const selectUserRole=state=>state.auth.userRole
export const selectIserId=state=>state.auth.userId