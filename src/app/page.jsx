"use client"
import Image from "next/image";
import useFetch from '@/hooks/useFetch';
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Header from "@/app/components/Header"
import Link from 'next/link';


export const getStrapiMedia = (url) => {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL;
  return `${apiUrl}${url}`;
};



export default  function Home() { 

  const { data, error, loading } = useFetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/produits?populate=*`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <main className="">

        {/* Header */}
        <div className="px-[60px] pt-[60px]">
          <Header />
        </div>

        {/* Articles */}
        <div className="py-[60px] px-[60px] w-full bg-white"> 

          <div className="pb-[50px]">
            <p className="text-[40px] font-semibold">Quelques articles</p>
          </div>
            {/* les produits */}
          <div className="grid grid-cols-4 w-full gap-[20px]">
          {
           data && data.map((produit, id) => (

              <div className="flex  bg-gray-400 justify-center shadow-md rounded-[20px]" key={produit.id}>
                <div className="flex flex-col gap-y-2">
                  <div className="">
                    <img src={getStrapiMedia(produit.ProductImage.url)} alt="produit image" width={200} height={200} className="w-full object-full"/>
                  </div>
                  <div className="px-6 py-4 bg-white flex flex-col gap-[10px]">
                    <Link href={`/produit/${produit.slug}`} className="underline">
                      <small className="text-[40px] font-semibold">{produit.Titre}</small>
                    </Link>
                    <BlocksRenderer
                      content={produit.Description}
                      blocks={{                            
                        p: ({ children }) => {
                          return (
                            <p className="font-clarity font-[400] pb-[32px] md:pb-[13px] lg:pb-[24px] text-[14px] lg:text-[18px] leading-[34.38px] md:leading-[56.06px] lg:leading-[74.75px]">
                              {children}
                            </p>
                          );
                        },
                      }}
                    />
                    <p className="font-medium text-[25px]">{produit.Price} $</p>
                  </div>
                </div>
              </div>
            ))
          }
          </div>

        </div>
      </main>
      
    </div>
  );
}
