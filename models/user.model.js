import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    credits:{
        type:Number,
        default:1000,

    }
},{timestamps:true})

const User = mongoose.model("User" , UserSchema)
export default User