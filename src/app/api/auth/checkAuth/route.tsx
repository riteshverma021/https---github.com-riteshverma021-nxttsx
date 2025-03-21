import { NextRequest, NextResponse } from "next/server";


 
import { authenticateUser } from "@/app/middleware/protectrouter";




const SECRET_KEY =   "ritesh";

export async function GET(req: NextRequest) {
    try {
const userD  = await authenticateUser(req)
console.log("waht i getting at the check auth", userD);

        

        if (!userD) {
            return NextResponse.json({ isAuthenticated: false }, { status: 401 });
        }

  

        return NextResponse.json({ isAuthenticated: true, user: userD });

    } catch (error: any) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });

    }
}
