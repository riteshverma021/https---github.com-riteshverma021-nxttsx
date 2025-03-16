import { connectDb } from "@/lib/db";
import ExBook from "@/model/bookModel";

import { NextResponse } from "next/server";

export async function GET() {
console.log("listenend");

    try {
        await connectDb();
        const books = await ExBook.find({});
    
        return NextResponse.json(books, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
      }


    
}
export async function POST(req:Request) {

 try {

    await connectDb();
    let newData = await req.json();
  


    const datanew  = new ExBook(newData);
    console.log("data from frontned ",newData);
    
await datanew.save()
    
    
    return NextResponse.json({status:200})
    
 } catch (error) {
    console.log("internal error" , error);
    
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
 }
    
}


