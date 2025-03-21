import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/model/userModel";


const SECRET_KEY =   "ritesh";
export const authenticateUser = async(req: NextRequest) => {
try {
    
     const token = req.cookies.get("jwt")?.value; 
    
            if (!token) {
                return null
            }
    
            const decoded = jwt.verify(token, SECRET_KEY) 


 const user = await User.findById(decoded.userId).select("-password");

          
    console.log("from middle ware" , user);
    
return user

   
} catch (error) {
    return null;
}














}