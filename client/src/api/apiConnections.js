import baseURL from './baseURL'
import {toast} from 'react-toastify'

export const signUp = async(values)=>{
    try{
        const response = await baseURL.post('/user/signup',values)
        if(response) return response.data
    }catch(error){
        toast.error('Error occured while registering')
    }
}

export const signIn = async(values)=>{
    try{
        const response = await baseURL.post('/user/signin',values)
        if(response) return response.data
    }catch(error){
        toast.error('Error occured while login')
    }
}

export const getUploadedAllFiles = async()=>{
    try{
        const response = await baseURL.get(`/user/getallfiles`)
        if(response) return response.data
    }catch(error){
        toast.error('Error occured while fetching files')
    }
}

export const getUploadedAll = async(userName)=>{
    try{
        const response = await baseURL.get(`/user/getfiles/${userName}`)
        if(response) return response.data
    }catch(error){
        toast.error('Error occured while fetching files')
    }
}

export const uploadFile = async(userName,file)=>{
    try{
        const form = new FormData
        form.append('userName',userName)
        form.append('file',file)
        const response = await baseURL.post('/user/upload',form,{
            headers:{'Content-Type' : 'multipart/form-data'}
        })
        if(response) return response.data
    }catch(error){
        toast.error('Error occured while uploading file')
    }
}


export const removeFileFromDB = async(userName,fileId)=>{
    try{
        const response = await baseURL.patch('/user/removefile',{userName,fileId})
        if(response) return response.data
    }catch(error){
        toast.error('Error occured while removing file')
    }
}


export const verifySecret = async(fileId,secret)=>{
    try{
        const response = await baseURL.get(`/user/verifysecret/${fileId}/${secret}`)
        if(response) return response.data
    }catch(error){
        toast.error('Error occured while verifying the secret key')
    }
}

