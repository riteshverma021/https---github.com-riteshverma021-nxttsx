import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import ExBook from "@/model/bookModel";
import { authenticateUser } from "@/app/middleware/protectrouter";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
 ) {
    await connectDb();
  
    
  
    try {

      const finddata = await ExBook.findById(params.id);
      
  
      if (!finddata) {
        return NextResponse.json({ error: "No data present" }, { status: 404 });
      }
  
      return NextResponse.json(finddata, { status: 200 });
    } catch (error) {
      console.error("Internal error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }






  export async function PUT(req:NextRequest , {params}:{params:{id:string}}) {

connectDb();



try {


  const user = await authenticateUser(req);
  const autBook = await ExBook.findById(params.id)

 console.log("at update",user);
 
 
  if(autBook.user.toString()  !==    user._id.toString()){
    console.log("unauthorizes");
    return NextResponse.json({ error: "Permission denied" }, { status: 403 });
  
  }
console.log("authorzed");




  let updateddata =await req.json();

  await ExBook.findByIdAndUpdate(params.id,updateddata,{new:true})
    if (!updateddata) {
      return NextResponse.json({ error: "book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully"}, { status: 200 });

} catch (error) {

  console.log("internal error ", error );
  
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

    
  }




  export async function DELETE(req:NextRequest , {params}:{params:{id:string}}){
 

    
try {

  await connectDb();



  const user = await authenticateUser(req);
  const autBook = await ExBook.findById(params.id)

  if(autBook.user.toString()  !==    user._id.toString()){
    console.log("unauthorizes");
    return NextResponse.json({ error: "Permission denied" }, { status: 403 });
  
  }


await ExBook.findByIdAndDelete(params.id)
return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
  
} catch (error) {
  console.error("Delete Error:", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}


  }