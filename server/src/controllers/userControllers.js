import userHelpers from "../helpers/userHelpers.js"
import authMiddlewares from '../middlewares/authMiddlewares.js'
import { fileURLToPath } from 'url';
import path,{dirname} from 'path'

const userControllers = {
    signup:async(req,res)=>{
        const {userName,password} = req.body
        const userExists = await userHelpers.findUserByName(userName)
        if(userExists){
            res.json({status:false,message:'User name already exists'})
        }else{
            const hashedPassword = await authMiddlewares.encryptPassword(password)
            const response = await userHelpers.signup(userName,hashedPassword)
            if(response){
                const token = authMiddlewares.generateToken(response._id)
                res.json({status:true,message:'User registration successfull',data:response.userName,token})
            }
        }
    },
    signin:async(req,res)=>{
        const {userName,password} = req.body
        const userExists = await userHelpers.findUserByName(userName)
        if(userExists){
            const response = await authMiddlewares.comparePassword(password,userExists.password)
            if(response){
                const token = authMiddlewares.generateToken(userExists._id)
                res.json({status:true,message:'Signin success',data:userExists.userName,token})
            }else{
                res.json({status:false,message:'Password is wrong'})
            }
        }else{
            res.json({status:false,message:'User does not exists'})
        }
    },
    getUploadedAllFiles:async(req,res)=>{
        const response = await userHelpers.getAllUploadedFiles()
        if(response){
            res.json({status:true,data:response})
        }
    },
    getUploadedFiles:async(req,res)=>{
        const {userName} = req.params
        const encodedUserName = encodeURIComponent(userName)
        const response = await userHelpers.getUploadedUserFiles(encodedUserName)
        if(response){
            res.json({status:true,data:response})
        }
    },
    uploadFile:async(req,res)=>{
        const file = req.file.filename
        const {userName} = req.body
        const response = await userHelpers.uploadFile(userName,file)
        if(response){
            res.json({status:true,data:response})
        }
    },
    removeFile:async(req,res)=>{
        const {userName,fileId} = req.body
        const response = await userHelpers.removeFileFromDB(userName,fileId)
        if(response){
            res.json({status:true,id:response._id})
        }
    },
    secretKeyVerification:async(req,res)=>{
        const {fileId,secret} = req.params
        const response = await userHelpers.verifySecretKey(fileId,secret)
        if(response){
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const filePath = path.join(__dirname,'..',`public/uploads/${response.fileName}`)
            res.download(filePath)
            res.json({status:true,fileName:response.fileName})
        }else{
            res.json({status:false})
        }
    }
}

export default userControllers