import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from "./Button"

const Header = () => {
  return (
    <div className="w-full h-full pt-[160px]">
      <div className="relative py-[60px] w-full h-[100vh] flex bg-white">
        <div className="w-full h-full">
          {/* product */}
          <div className="absolute inset-0 top-0 bottom-0 w-full h-full">
            <div className="absolute top-0 left-1">
              <Image src="/men-shoes.png" className="" width={170} height={170}/>
            </div>
            <Image alt="top" src="/top.jpg" width={400} height={400} className="w-full h-full" />
          </div>
          <div className="absolute bottom-0 right-0">
            <Image src="/shoes.png" className="" width={170} height={170} alt="woman-shoes"/>
          </div>
          <div className="absolute top-0 bottom-0 w-full h-full bg-black/50"></div>
          {/* text */}
          <div className="relative w-full h-full">
            <div className="flex h-full w-full justify-center flex-col gap-[50px] items-center">    
              {/* titre */}
              <div className="">
                  <h1 className="text-[70px] text-white text-center">Make a right choice your daily fashion</h1>
              </div>
              {/* bouton */}
              <div className="">
                  <Link href="/">              
                      <Button className="bg-gray-700">Make it</Button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header