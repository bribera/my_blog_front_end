"use client"
import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { IoLogoInstagram } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import Button from "./Button"





const social = [
  {
    nom: "Facebook",
    path: "/",
    icon: <TiSocialFacebook />
  },
  {
    nom: "Twitter",
    path: "/nouveaute",
    icon: <TiSocialTwitter />
  },
  {
    nom: "Instagram",
    path: "/contact",
    icon: <IoLogoInstagram />
  },
]

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


const Footer = () => {


  return (
    <div className="py-[20px] bg-gray-200 px-[60px]">
        <footer className="">
          <div className="grid grid-cols-4">

            {/* first grid */}
            <div className="flex flex-col gap-2">
                {/* image */}
              <div className="">
                <Image src="/logo-color.png" width={50} height={50} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium w-[150px]">The first is important in everithing we touch</p>
                     {/* menu */}
                    <div className="">
                      <ul className="flex gap-[20px]">

                      { social.map((item, id) => (
                          <Link className="font-medium text-[20px]" href={item.path} key="id">
                            {item.icon}
                          </Link>
                        ))}

                      </ul>
                    </div>
              </div>
            </div>

            {/* two grid */}
            <div className="flex flex-col gap-2">
                {/* titre*/}
              <div className="">
                  <p className="font-bold text-[28px]">Liens</p>
              </div>
              {/* menu */}
              <div className="">
                <ul className="flex flex-col gap-[20px]">
                  { menu.map((item, id) => (
                    <Link className="font-semibold text-[20px]" href={item.path} key="id">
                      {item.nom}
                    </Link>
                    ))}
                </ul>
              </div>
            </div>
           
            {/* three grid */}
            <div className="flex flex-col gap-2">
              {/* titre */}
              <div className="">
               <p className="font-bold text-[28px]">Articles</p>
              </div>              
              {/* les actualités */}                
              <ul className="flex gap-[20px] flex-col">
                {/* first link */}
                <div className="flex gap-x-2 items-center">
                  <div className="w-[5px] h-[5px] rounded-[50%] bg-gray-800"></div>
                  <Link className="font-medium text-[20px]" href="/">
                    Actualités
                  </Link>
                </div>
                {/* two link */}
                <div className="flex gap-x-2 items-center">
                  <div className="w-[5px] h-[5px] rounded-[50%] bg-gray-800"></div>
                  <Link className="font-medium text-[20px]" href="/">
                    Actualités
                  </Link>
                </div>
                {/* three link */}
                <div className="flex gap-x-2 items-center">
                  <div className="w-[5px] h-[5px] rounded-[50%] bg-gray-800"></div>
                  <Link className="font-medium text-[20px]" href="/">
                    Actualités
                  </Link>
                </div>
                {/* four link */}
                <div className="flex gap-x-2 items-center">
                  <div className="w-[5px] h-[5px] rounded-[50%] bg-gray-800"></div>
                  <Link className="font-medium text-[20px]" href="/">
                    Actualités
                  </Link>
                </div>
              </ul>  
            </div>

            {/* four grid */}
            <div className="flex flex-col gap-2">
                {/* titre*/}
              <div className="">
                <p className="font-bold text-[28px]">Contact</p>
              </div>
              <div className="flex flex-col gap-2">                     {/* menu */}
                <form action="" className="flex flex-col gap-[10px] bg-slate-400 px-2 py-3 rounded-md">
                  <p className="font-medium text-[20px]">Message</p>
                  <textarea name="" id="" placeholder="Que voulez vous savoir ?" className="py-1 px-2 rounded-md"></textarea>
                  <Button className="">Envoyer</Button>
                </form>
                <div className="flex gap-x-2 items-center font-medium text-[20px]">
                  <IoIosCall />
                  <p className="">fashionjoy@gmail.com</p>
                </div>
                <div className="flex gap-x-2 items-center font-medium text-[20px]">
                  <IoIosMail />
                  <p className="">+225 67 45 23 89</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer
