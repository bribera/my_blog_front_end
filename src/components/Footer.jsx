"use client"
import React from 'react'
import Image from 'next/image'
import useFetch from '@/hooks/useFetch';
import Link from "next/link"


// export const getStrapiMedia = (url) => {
//   return `http://localhost:1337${url}`;
// };

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

  // const { data, error, loading } = useFetch('http://localhost:1337/api/footers?populate=*');
  
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error}</p>;

    // console.log(data);
    // console.log("1");
    // console.log(loading);

  return (
    <div className="py-[20px] bg-gray-200 px-[60px]">
        <footer className="">
          <div className="">
            {/* <div className="">
              <Image alt="logo" src={data.logo.url} width={200} height={200} className=""/>
              <p>{data.description}</p>
                <ul>                
                  <li>
                    <a href={data.facebook}>Facebook</a>
                  </li>
                </ul>
            </div> */}
            {/* first grid */}
            <div className="flex flex-col gap-2">
                {/* image */}
              <div className="">
                <Image src="/logo-color.png" width={80} height={80} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="">The first is important in everithing we touch</p>
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
          </div>
        </footer>
    </div>
  )
}

export default Footer
