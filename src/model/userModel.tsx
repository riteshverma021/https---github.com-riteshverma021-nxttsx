import mongoose from "mongoose";

const  Schema = mongoose.Schema
interface datatype{
    name: string;
    password: string;
    email: string;
  
}

const userSchema = new Schema<datatype>({

    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 

})
const User  =   mongoose.models.User   || mongoose.model<datatype>("User",userSchema)

export default User