"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Button from './Button'
import { loginUser } from '@/lib/api';



const SignIn = () => {

    const [userData, setUserData] = useState({
        identifier: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(userData);
            console.log("Login sucessful:", response)
        } catch(error) {
            console.log("Login failed:", error)
        }
    }

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='bg-white py-2 px-3 rounded-md w-[500px] flex flex-col gap-[20px]' >
            {/* titre */}
            <div className="space-y-2">
                <p className="text-[22px] font-bold border-b-[2px] border-gray-800">
                    Se Connecter
                </p>
                <p className="text-[14px] italic">
                    Veuillez remplir les informations suivants 
                </p>
            </div>

            {/* imputs */}

            <div className="space-y-4 flex flex-col gap-[10px]">
                {/* <input 
                    type="text" 
                    name="username"
                    className='border-[1px] py-1 px-2 rounded-md' 
                //   onChange={handleChange} 
                    placeholder="Username" 
                    required 
                /> */}
                <input 
                    type="email" 
                    name="email"
                    className='border-[1px] py-1 px-2 rounded-md' 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    className='border-[1px] py-1 px-2 rounded-md'
                    onChange={handleChange} 
                    placeholder="Password" 
                    required 
                />
            </div>
            {/* button */}
            <div className="">
                <Link href="/">
                    <Button type="submit">Se connecter</Button>
                </Link>
            </div>

            <div className="mt-4 text-center text-[16px]">
              Pas de compte?
                <Link className="underline ml-2 italic" href="/auth/signup">
                    S'enregister
                </Link>
            </div>
        </form>
      </div>
    
  )
}

export default SignIn




