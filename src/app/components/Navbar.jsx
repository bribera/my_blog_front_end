import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const {user, logout} = useAuth();

  
  console.log("Navbar user", user);
  console.log("Navbar user email", user?.user?.email);

    const menu = [
      {
        nom: "Acceuil",
        path: "/",
      },
      {
        nom: "Nouveauté",
        path: "/nouveaute",
      },
      {
        nom: "Contact",
        path: "/contact",
      },
    ]

  return (
    <div className="fixed z-[99] w-full shadow">
      <div className="flex justify-between items-center py-4 px-[60px] rounded-e-6 bg-gray-200">
        {/* logo */}
        <div className="">
          <Image alt="logo" src="/logo-color.png" width={80} height={80}/>
        </div>
        {/* menu */}
        <div className="flex gap-[20px] items-center">
          <ul className="flex gap-[20px]">

           { menu.map((item, id) => (
              <Link className="font-semibold text-[20px]" href={item.path} key="id">
                {item.nom}
              </Link>
            ))}

          </ul>
          <div className="flex gap-2 items-center">
            {user && user.user ? (

                <div className="flex items-center gap-2">
                  <div className=" items-center flex flex-col">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      {user.user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-[20px] ml-2">
                      {user.user.email}
                    </span>
                  </div>
                  <Button onClick={logout}>Déconnexion</Button>
                </div>

              ) : (
                <>
                  <Link href="/auth/signup">
                    <Button>S'enregister</Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button>Se connecter</Button>
                  </Link>
                </>
            )}
            {/* <div className="flex gap-2 items-center">
              <Link href="/auth/signup">
                <Button>S'enregister</Button>
              </Link>
              <Link href="/auth/signin">
                <Button>Se connecter</Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar