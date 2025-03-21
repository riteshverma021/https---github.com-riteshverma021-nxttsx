"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    edition: "",
    publish: "",
    author: "",
    price: "",
    isbn: "",
    description: "",
  });


  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
   try {
    e.preventDefault();
    console.log("Data sent to backend:", data);

    const res =     await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });


    
    if(res.status===200){
      alert("added");
      router.push("/")
    }



      else  if(res.status === 401) {
        alert("Unauthorized! Please log in to add a book."); }
    

   } catch (error:any) {


    console.error("Error adding book:", error.response?.data?.error);


    if (error.response?.status === 401) {
      alert("Unauthorized! Please log in to add a book.");
  }

   }
  };

 
  if (!isMounted) return null;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add New Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Title" name="title" value={data.title} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Edition" name="edition" value={data.edition} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Author" name="author" value={data.author} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Price" name="price" type="number" value={data.price} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="ISBN" name="isbn" value={data.isbn} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Year" name="publish" value={data.publish} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Description" name="description" value={data.description} onChange={handleChange} margin="normal" multiline rows={3} required />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Page;
