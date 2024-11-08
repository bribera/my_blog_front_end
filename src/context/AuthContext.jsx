"use client"
import { getUser } from '@/lib/api'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState("")

    useEffect(() =>{
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if(token) {
                try{
                    const userData = await getUser(token);
                    setUser(userData)
                    
                } catch(error) {
                    error
                }
            }
        }

        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.jwt);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };    


  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)


