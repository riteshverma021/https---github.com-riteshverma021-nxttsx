"use client"

import React ,{FormEvent, HtmlHTMLAttributes, useState}from 'react'
import { useRouter } from "next/navigation";

interface User{
    name:string;
    email:string;
    password:string
}


const page = () => {



    const router  = useRouter()
 const [user, setUser] = useState<User>({
    name:"",
    email:"",
    password:""
 });




const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{


setUser({...user,[e.target.name]:e.target.value})

}


const handleSubmit=async(e:FormEvent)=>{


    e.preventDefault();


const res = await fetch("/api/auth/register",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
})



alert("Login Successful!");
router.push("/")

}


  return (
    <div>
        




<form    onSubmit={handleSubmit} >






<label htmlFor="name">name</label>
<input type="text" name="name" onChange={handleChange} value={user.name}   id="name" />

<label htmlFor="email">email</label>
<input type="text"  onChange={handleChange} value={user.email}   name="email" id="email" />

<label htmlFor="password">pass</label>
<input type="text"    onChange={handleChange} value={user.password}  name="password" id="password" />

<button>submit</button>
</form>



    </div>
  )
}

export default page