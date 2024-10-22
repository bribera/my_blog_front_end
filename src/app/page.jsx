"use client"
import Image from "next/image";
import useFetch from '@/hooks/useFetch';






export default  function Home() { 

  const { data, error, loading } = useFetch('http://localhost:1337/api/produits');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <main className="">
        <div className="">
          {
           data && data.data.map((produit, id) => (
              <div className="bg-gray-400 py-4 px-6" key={produit.id}>
                <div className="">
                  <div className="">
                    <Image src={produit.productImage} alt={produit.titre} width={200} height={200}/>
                  </div>
                  <div className="">
                    <small className="">{produit.titre}</small>
                    <p className="">{produit.description}</p>
                    <p className="">{produit.price}</p>
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
