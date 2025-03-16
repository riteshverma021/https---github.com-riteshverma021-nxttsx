"use client";

import { useRouter } from "next/navigation";
import React, {  useContext, useEffect, useState } from "react";
import { 
  Container, Grid, Card, CardContent, Typography, CircularProgress, Button 
} from "@mui/material";
import { authContext } from "@/context/page";

interface Book {
  _id: string;
  title: string;
  isbn: string;
  price: number;
  edition: string;
  publish: string;
  description: string;

}

export default function Home() {

  const auth = useContext(authContext);
  if (!auth) {
      throw new Error("useContext(authContext) must be used within an AuthProvider");
  }
  const { isAuthenticated, setIsAuthenticated } = auth;

  const router = useRouter();
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
   
        
        const books = await res.json();
        console.log("Fetched data => ", books);
        setData(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();




    
  }, []);
const handleDelete=async(id:string)=>{

  const res = await fetch(`/api/books/${id}`,{method:"DELETE"})

if(res.ok){
setData(data.filter((book)=>book._id!=id))

}


}



const logutFunc=async()=>{
  const res = await fetch("/api/auth/logout",{method:"POST"})

  if(res.ok){
setIsAuthenticated(false)
    alert("log outed")

  }
}


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Book List

      </Typography>
       <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ m: 2 }} 
                 onClick={()=>router.push("bookstore/addNew")}
                >
            Add New
                </Button>

          
          




{isAuthenticated?      <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ m: 2 }} 
                 onClick={logutFunc}
                >
            logout 
                </Button>:<>      <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ m: 2 }} 
                 onClick={()=>router.push("/auth/login")}
                >
            Login 
                </Button>



                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ m: 2 }} 
                 onClick={()=>router.push("/auth/register")}
                >
            register 
                </Button>

</>}


      {loading ? (
        <CircularProgress />
      ) : (

        
        <Grid container spacing={3}>




          {data.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    ISBN: {book.isbn}
                  </Typography>
                  <Typography variant="body2">
                    Price: <strong>${book.price}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Edition: {book.edition} | Published: {book.publish}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {book.description}
                  </Typography>
                </CardContent>

                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ m: 2 }} 
                  onClick={() => router.push(`/bookstore/editBook/${book._id}`)}
                >
                  Edit
                </Button>


                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ m: 2 }} 
                 onClick={()=> handleDelete(book._id)}
                >
                  Delete
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
