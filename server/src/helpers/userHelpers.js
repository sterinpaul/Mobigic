import User from '../model/userModel.js'
import Uploads from '../model/uploadsModel.js'
import {v4 as uuid} from 'uuid'
import fs from 'fs'

const userHelpers = {
    findUserByName:async(userName)=>{
        return await User.findOne({userName})
    },
    signup:async(userName,password)=>{
        const newUser = new User({
            userName,
            password
        })
        return await newUser.save()
    },
    getAllUploadedFiles:async()=>{
        return await Uploads.find({listed:true},{secretKey:false,listed:false}).sort({createdAt:-1})
    },
    getUploadedUserFiles:async(userName)=>{
        return await Uploads.find({userName,listed:true},{listed:false}).sort({createdAt:-1})
    },
    uploadFile:async(userName,fileName)=>{
        const secretKey = uuid().slice(0, 6)
        const newFile = new Uploads({
            userName,
            fileName,
            secretKey
        })
        return await newFile.save()
    },
    removeFileFromDB:async(userName,_id)=>{
        const response = await Uploads.findOneAndUpdate({_id,userName},{$set:{listed:false}})
        if(response){
            fs.unlinkSync(`src/public/uploads/${response.fileName}`)
        }
        return response
    },
    verifySecretKey:async(_id,secretKey)=>{
        return await Uploads.findOne({_id,secretKey})
    }
}

export default userHelpers