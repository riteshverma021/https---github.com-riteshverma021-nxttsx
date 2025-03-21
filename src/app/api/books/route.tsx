import { connectDb } from "@/lib/db";
import ExBook from "@/model/bookModel";
import { authenticateUser } from "@/app/middleware/protectrouter";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest) {



    try {
        await connectDb();
        const books = await ExBook.find({});
    
        return NextResponse.json(books, { status: 200 });
      } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
      }

}





export async function POST(req:NextRequest) {


 try {

    await connectDb();


  const _user= await authenticateUser(req);

  console.log("at the add new",_user);
  
  if(!_user){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

    let newData = await req.json();

  newData.user = _user._id


  const datanew = new ExBook(newData);

    
await datanew.save()
    
  return NextResponse.json({status:200})
    
 } catch (error) {
    console.log("internal error" , error);
    
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
  )
 }
    
}


