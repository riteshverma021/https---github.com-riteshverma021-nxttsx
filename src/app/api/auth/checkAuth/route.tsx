import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";



const SECRET_KEY =   "ritesh";

export async function GET(req: NextRequest) {
    try {


        const token = req.cookies.get("jwt")?.value; // Get token from cookies

        if (!token) {
            return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
        }

        const decoded = jwt.verify(token, SECRET_KEY)

        return NextResponse.json({ isAuthenticated: true, user: decoded });

    } catch (error: any) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });

    }
}
