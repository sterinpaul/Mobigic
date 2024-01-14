import {Schema,model} from "mongoose";

// User schema
const uploadScheme = new Schema(
    {
        userName:{
            type:String,
            required:true
        },
        fileName:{
            type:String,
            required:true
        },
        listed:{
            type:Boolean,
            default:true,
            required:true
        },
        secretKey:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Uploads = model('Uploads',uploadScheme)
export default Uploads