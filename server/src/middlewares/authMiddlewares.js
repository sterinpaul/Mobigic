import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import configKeys from '../config/envConfig.js'

const authService = {
    encryptPassword : async(password)=>{
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password,salt)
    },
    comparePassword : async(password,hashedPassword)=>{
        return await bcrypt.compare(password,hashedPassword)
    },
    generateToken : (payload)=>{
        if(configKeys.JWT_SECRET_KEY){
            return jwt.sign({payload},configKeys.JWT_SECRET_KEY,{
                expiresIn:"2d"
            })
        }else{
            console.log("JWT Token is undefined")
        }
    },
    verifyToken : (token)=>{
        if(configKeys.JWT_SECRET_KEY){
            const userData = jwt.verify(token,configKeys.JWT_SECRET_KEY)
            if(userData.exp !== undefined){
                const currentTimeInSeconds = Math.floor(Date.now() / 1000)
                if(userData.exp >= currentTimeInSeconds){
                    return userData.payload
                }else{
                    return false
                }
            }
        }
        return undefined
    }
}

export default authService