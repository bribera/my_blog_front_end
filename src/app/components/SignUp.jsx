"use client"
import React, { useState } from "react"
import Link from "next/link";
import Button from "./Button";
import { registerUser } from '../../lib/api'


const SignUp = () => {

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData ({...userData, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await registerUser(userData);
            console.log("Registration sucessful:", response);

        } catch(error) {
            console.log("Registration failed:", error);
        }
    }

    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <form onSubmit={handleSubmit}  className="bg-white flex flex-col w-[500px] gap-[20px] py-2 px-3 rounded-md">
           {/* titre */}

            <div className="space-y-2">

                <p className="text-[24px] font-bold border-b-[2px] border-gray-800">
                    S'enregister
                </p>
                <p className="text-[14px] italic">
                    Veuillez remplir les informations suivants pour créer un nouveau compte
                </p>
            </div>

            {/* inputs */}

            <div className="space-y-4 flex flex-col gap-[10px]">
                {/* username */}
                <input 
                    type="text" 
                    name="username" 
                    onChange={handleChange} 
                    placeholder="Username" 
                    className="border-[1px] px-1 py-2 rounded-md"
                    required 
                />
                {/* email */}
                <input 
                    type="email" 
                    name="email" 
                    onChange={handleChange} 
                    placeholder="Email" 
                    className="border-[1px] px-1 py-2 rounded-md"
                    required 
                />
                {/* password */}
                <input 
                    type="password" 
                    name="password" 
                     onChange={handleChange} 
                    placeholder="Password" 
                    className="border-[1px] px-1 py-2 rounded-md"
                    required 
                />
            </div>

            {/* button submit */}
            
            <Button type="submit" >S'enregister</Button>
            

            <div className="mt-4 text-center text-[16px]">
                Déjà un compte?
                <Link className="underline ml-2 italic" href="/auth/signin">
                    Se connecter
                </Link>
            </div>
        </form>
      </div>
    )
  }
  
  export default SignUp