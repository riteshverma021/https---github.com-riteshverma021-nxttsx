"use client";

import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }

            alert("Login Successful!");
            router.push("/"); 
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box 
                sx={{ 
                    mt: 8, p: 4, 
                    boxShadow: 3, 
                    borderRadius: 2, 
                    textAlign: "center", 
                    bgcolor: "white" 
                }}
            >
                <Typography variant="h4" gutterBottom>Login</Typography>
                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth label="Email" 
                        variant="outlined" 
                        margin="normal" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    
                    <TextField 
                        fullWidth label="Password" 
                        type="password" 
                        variant="outlined" 
                        margin="normal" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
