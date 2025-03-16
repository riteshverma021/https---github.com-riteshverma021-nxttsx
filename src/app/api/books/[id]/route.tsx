import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import ExBook from "@/model/bookModel";



export async function GET(
    req: Request,
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






  export async function PUT(req:Request , {params}:{params:{id:string}}) {

connectDb();



try {
  let updateddata =await req.json();

  await ExBook.findByIdAndUpdate(params.id,updateddata,{new:true})
    if (!updateddata) {
      return NextResponse.json({ error: "book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully"}, { status: 200 });

} catch (error) {
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

    
  }




  export async function DELETE(req:Request , {params}:{params:{id:string}}){
 
 await connectDb();

try {
await ExBook.findByIdAndDelete(params.id)
return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
  
} catch (error) {
  console.error("Delete Error:", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}


  }