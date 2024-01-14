import { createSlice } from "@reduxjs/toolkit";

const getToken = ()=>{
    const token = localStorage.getItem('token')
    if(token) return token
}

const getName = ()=>{
    const userName = localStorage.getItem('name')
    if(userName) return userName
}

const userSlice = createSlice({
    name:'user',
    initialState:{
        token:getToken(),
        userName:getName(),
        uploadedFiles:[]
    },
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload
            localStorage.setItem('token',action.payload)
        },
        setUser:(state,action)=>{
            state.userName = action.payload
            localStorage.setItem('name',action.payload)
        },
        setUploadedFiles:(state,action)=>{
            state.uploadedFiles = action.payload
        },
        setSignOut:(state)=>{
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('name')
        }
    }
})

export const {setToken,setUser,setUploadedFiles,setSignOut} = userSlice.actions
export default userSlice.reducer