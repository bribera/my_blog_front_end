'use client'
import React from 'react'
import {AuthProvider} from "@/context/AuthContext"

const AuthLayout = ({children}) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default AuthLayout
