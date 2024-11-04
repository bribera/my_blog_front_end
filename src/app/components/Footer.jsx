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
    lien: "https://vercel.com/",
    icon: <TiSocialFacebook />
  },
  {
    nom: "Twitter",
    lien: "https://vercel.com/",
    icon: <TiSocialTwitter />
  },
  {
    nom: "Instagram",
    lien: "https://vercel.com/",
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
    <div className="py-[20px] bg-gray-200 px-[60px] border-[1px]  border-t-gray-600">
        <footer className="">
          <div className="grid grid-cols-3 lg:grid-cols-3 gap-y-[20px] lg:gap-y-0">

            {/* first grid */}
            <div className="flex flex-col gap-2">
                {/* image */}
              <div className="">
                <Image src="/logo-color.png" width={50} height={50} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium w-[150px] text-[18px]">The first is important in everithing we touch</p>
                     {/* menu */}
                    <div className="">
                      <ul className="flex gap-[20px]">

                      { social.map((item, id) => (
                          <Link className="font-medium text-[20px]" href={item.lien} key="id">
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
                <ul className="flex flex-col gap-[10px]">
                  { menu.map((item, id) => (
                    <Link className="font-medium text-[18px]" href={item.path} key="id">
                      {item.nom}
                    </Link>
                    ))}
                </ul>
              </div>
            </div>
      

            {/* four grid */}
            <div className="flex flex-col gap-2">
                {/* titre*/}
              <div className="">
                <p className="font-bold text-[28px]">Contact</p>
              </div>
              <div className="flex flex-col gap-2">                     {/* menu */}
                {/* <form action="" className="flex flex-col gap-[10px] bg-slate-400 px-2 py-3 rounded-md">
                  <p className="font-medium text-[20px]">Message</p>
                  <textarea name="" id="" placeholder="Que voulez vous savoir ?" className="py-1 px-2 rounded-md"></textarea>
                  <Button className="">Envoyer</Button>
                </form> */}
                <div className="flex gap-x-2 items-center font-medium text-[20px]">
                  <IoIosCall />
                  <p className="text-[20px]">fashionjoy@gmail.com</p>
                </div>
                <div className="flex gap-x-2 items-center font-medium text-[20px]">
                  <IoIosMail />
                  <p className="text-[20px]">+225 67 45 23 89</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer