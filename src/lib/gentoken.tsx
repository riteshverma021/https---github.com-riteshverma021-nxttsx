import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = "ritesh";

export async function genToken(userId: string): Promise<NextResponse> {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });

    const response = NextResponse.json({ token });

    response.cookies.set("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
    });

    return response;
}
