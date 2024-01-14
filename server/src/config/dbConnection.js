import mongoose from 'mongoose'
import configKeys from './envConfig.js'

const mongoDBConnect = async()=>{
    try{
        await mongoose.connect(configKeys.MONGODB_ATLAS_URL).then(()=>{
            console.log("Database connected successfully")
        })
    }catch(error){
        console.log(`Database connection error : ${error}`)
        process.exit(1)
    }
}

export default mongoDBConnect