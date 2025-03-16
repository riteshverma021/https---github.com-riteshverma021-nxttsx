import { NextResponse } from "next/server";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import { genToken } from "@/lib/gentoken";


export async function POST(req:Request) {
console.log("req");

let {name , email , password} = await req.json();
try {

    if(password<6){
        return NextResponse.json({message:" password must of legnth 6"},{status:400})
    }

    const user = await User.findOne({email});
    if(user){
        return NextResponse.json({message:" email already registered"},{status:400})
    }

    const salt = await bcrypt.genSalt(10)

    
    const hashedPass = await bcrypt.hash(password,salt)


    const newUser = new User({
        name :name,
        email : email,
        password :hashedPass
    })


    if(newUser){


await newUser.save();

return await genToken(newUser._id);
    }


    
} catch (error) {
    console.error("error in signup controller:",error)

    return NextResponse.json({message:" internal server error"},{status:400})
}





}


