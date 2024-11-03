'use client'
import React from 'react'
import Button from "@/app/components/Button"
import useFetch from '@/hooks/useFetch';
import Image from "next/image";

export const getStrapiMedia = (url) => {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL;
  return `${apiUrl}${url}`;
}


const ProduitDetails = ({params}) => {

  const { slug } = params;
  const { data: product, error, loading } = useFetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/produits?filters[slug][$eq]=${slug}&populate=*`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!product || product.length === 0) return <p>No product found.</p>;

  const produit = product[0];

  return (
    <div className="bg-slate-300 pt-[160px] pb-[60px] px-[60px]">
      <div className="flex flex-col gap-[20px]">
        {/* title */}
        <div className=" flex gap-[20px] items-center">
           {/* image */}
          <div className="bg-white rounded-[50%]">
            <Image
              src={getStrapiMedia(produit.ProductImage.url)}
              alt={produit.Titre}
              width={150}
              height={150}
              className=""
            />
          </div>
          {/* image */}
          <div className="flex flex-col gap-[10px] items-center">
            <h1 className="text-[40px] font-semibold">{produit.Titre}</h1>
            <Button type="button" >Achetez</Button>
          </div>
        </div>
        {/* information & Prix */}
        <div className="flex flex-col gap-[20px]">
            <p className="">
                What is Lorem Ipsum?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <br/>
                Why do we use it?
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
            <p className="font-medium text-[25px]">{produit.Price} $</p>
            <Button type="button" >Achetez</Button>
        </div>
      </div>
    </div>
  )
}

export default ProduitDetails
