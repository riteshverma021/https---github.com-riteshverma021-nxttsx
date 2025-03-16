import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const response = NextResponse.json({ message: "Logout successful" });


        response.cookies.set("jwt", "", {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            expires: new Date(0), 
        });

        return response;
    } catch (error) {
    
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
