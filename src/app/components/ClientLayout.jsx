"use client"
import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePathname } from "next/navigation";


const ClientLayout = ({children}) => {
    
    const pathname = usePathname();

    const isLoginOrRegister = pathname === "/auth/signin" || pathname === "/auth/signup"
    
    return (
        <>
            {!isLoginOrRegister && <Navbar/>}

            {children}

            {!isLoginOrRegister && <Footer/>}
        </>
    )
    }

export default ClientLayout
