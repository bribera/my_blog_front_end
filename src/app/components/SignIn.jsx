"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Button from './Button'
import { loginUser } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';



const SignIn = () => {

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState(''); 

    const route = useRouter();
    const {login} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(identifier, password);
            login(user);

            console.log("6")
            console.log(user)

            route.push("/")
        } catch(error) {
           console.log("error in logging:",error) 
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
               
                <input 
                    type="email" 
                    className='border-[1px] py-1 px-2 rounded-md' 
                    onChange={(e) => setIdentifier(e.target.value)} 
                    placeholder="Email"
                    value={identifier} 
                    required 
                />
                <input 
                    type="password"  
                    className='border-[1px] py-1 px-2 rounded-md'
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    placeholder="Password" 
                    required 
                />
            </div>
            {/* button */}
            <div className="">
                
                <Button type="submit">Se connecter</Button>
               
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




