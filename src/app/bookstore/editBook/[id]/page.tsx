"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Container, Button } from "@mui/material";
import { useRouter } from "next/navigation";
interface Book {
  title: string;
  edition: string;
  publish: string;
  price: string;
  isbn: string;
  description: string;
}

const Page = () => {
  
  const router = useRouter()

  const { id } = useParams();



  const [fetchData, setFetchData] = useState<Book>({
    title: "",
    edition: "",
    publish: "",
    price: "",
    isbn: "",
    description: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchDataBack = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const resData = await res.json();
        setFetchData(resData);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchDataBack();
  }, [id]); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFetchData({ ...fetchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fetchData),
      });
      if (response.status===200) {
  
        router.push('/');
      }else if(response.status===403){
        alert("not authorized")
      }

      
      
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Edit Book Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Title" name="title" onChange={handleChange} value={fetchData.title} fullWidth />
          <TextField label="Edition" name="edition" onChange={handleChange} value={fetchData.edition} fullWidth />
          <TextField label="Publish" name="publish" onChange={handleChange} value={fetchData.publish} fullWidth />
          <TextField label="Price" name="price" onChange={handleChange} value={fetchData.price} fullWidth />
          <TextField label="ISBN" name="isbn" onChange={handleChange} value={fetchData.isbn} fullWidth />
          <TextField label="Description" name="description" onChange={handleChange} value={fetchData.description} multiline rows={3} fullWidth />
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} >
          Submit
        </Button>
      </form>


    </Container>
  );
};

export default Page;
