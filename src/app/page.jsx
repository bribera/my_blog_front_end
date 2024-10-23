"use client"
import Image from "next/image";
import useFetch from '@/hooks/useFetch';
import { BlocksRenderer } from "@strapi/blocks-react-renderer";


export const getStrapiMedia = (url) => {
  return `http://localhost:1337${url}`;
};



export default  function Home() { 

  const { data, error, loading } = useFetch('http://localhost:1337/api/produits?populate=*');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <main className="py-[20px] px-[60px] w-full">
        <div className="grid grid-cols-4 w-full gap-[20px]">
          {
           data && data.map((produit, id) => (

              <div className="flex  bg-gray-400 justify-center shadow-md rounded-[20px]" key={produit.id}>
                <div className="flex flex-col gap-y-2">
                  <div className="">
                    <img src={getStrapiMedia(produit.ProductImage.url)} alt="produit image" width={200} height={200} className="w-full object-full"/>
                  </div>
                  <div className="px-6 py-4 bg-white flex flex-col gap-[10px]">
                    <small className="text-[40px] font-semibold">{produit.Titre}</small>
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
      </main>
      
    </div>
  );
}
