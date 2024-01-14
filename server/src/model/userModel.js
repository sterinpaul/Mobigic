import {Schema,model} from "mongoose";

// User schema
const userScheme = new Schema(
    {
        userName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const User = model('User',userScheme)
export default User