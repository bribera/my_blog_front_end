import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

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
    <div>
      <div className="flex justify-between items-center bg-gray-300 py-4 px-6 rounded-e-2 shadow-b-black">
        {/* logo */}
        <div className="">
          <Image alt="logo" src="/logo-color.png" width={80} height={80}/>
        </div>
        {/* menu */}
        <div className="">
          <ul className="flex gap-[20px]">

           { menu.map((item, id) => (
              <Link className="font-semibold text-[20px]" href={item.path} key="id">
                {item.nom}
              </Link>
            ))}

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar