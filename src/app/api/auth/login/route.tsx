import User from "@/model/userModel";
import { NextResponse } from "next/server";
import { genToken } from "@/lib/gentoken";
import bcrypt from "bcryptjs";


export async function POST(req:Request) {


    try {
        let {email , password} = await req.json();

const user  = await User.findOne({email});


if(!user){
    return  NextResponse.json({message:"user not exist"} , {status:400});

}




const isPasswrdCorrect = await bcrypt.compare(password , user.password)
if(!isPasswrdCorrect){
    return  NextResponse.json({message:"wrong pass"} , {status:400});
}


return await genToken(user._id);


    } catch (error) {
        console.log("error in controller" , error);
        console.log("internal server error");
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }




    
}