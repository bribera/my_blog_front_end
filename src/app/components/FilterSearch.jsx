'use client'
import React from 'react'
import Link from "next/link"
import { useState, useEffect } from 'react';
import { fetchCategories } from '@/lib/api';


export const getStrapiMedia = (url) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL;
  return `${baseUrl}${url}`; 
};

const itemsPerPage = 4;

const FilterSearch = () => {

  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState({
    data:[],
    meta: {
      pagination: {
        page: 1,
        pageSize: 4,
        pageCount: 0,
        total: 0
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [selectData, setSelectData] = useState("")

  // FetchCatégories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
         error
      }
    };
    
    loadCategories();
  }, []);

  // Fetch Article
  useEffect(() => {
    const loadArticles = async () => {

      setLoading(true);

      try { 
        
        let url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/articles?populate=*`;
        
        if (selectedCategory) {
          url += `&filters[categorie][id][$eq]=${selectedCategory}`;
        }
        
        if (searchTerm) {
          url += `&filters[title][$containsi]=${encodeURIComponent(searchTerm)}`;
        }
        
        url += `&pagination[page]=${encodeURIComponent(currentPage)}&pagination[pageSize]=${encodeURIComponent(itemsPerPage)}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const articlesData = await response.json()
        
        const formattedData = {
          data: articlesData.data || [],
          meta: {
            pagination: {
              page: articlesData.meta?.pagination?.page || 1,
              pageSize: articlesData.meta?.pagination?.pageSize || itemsPerPage,
              pageCount: articlesData.meta?.pagination?.pageCount || 0,
              total: articlesData.meta?.pagination?.total || 0
            }
          }
        };
        setArticles(formattedData);
      } catch (error) {
       console.log( "error loading", error)
      }
      setLoading(false);
    };

    loadArticles();
  }, [selectedCategory, searchTerm, currentPage, itemsPerPage]);

 

  const totalPages = articles?.meta?.pagination?.pageCount || 0;


  return (
    <div className=''>
      <div className="flex">
        {/* Filter par categories */}
        <div className="basis-[25%]">
          <select 
            onChange={(e) => {
              setSelectedCategory(e.target.value); 
              setCurrentPage(1);
            }} 
              value={selectedCategory} className='lg:w-[180px] md:w-[100px] py-[10px]'>
            
            <option value="" className="text-[20px] font-semibold">Catégories</option>
            
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
            
          </select>
        </div>
        {/* search & atricles disponibles */}
        <div className="basis-[75%] flex flex-col gap-[20px]">
          {/* search */}
          <div className="">
            <input
              type="text"
              placeholder="Rechercher des articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-1 py-2 rounded-md"
            />
          </div>

          <div className="text-sm">
            Total articles: {articles?.meta?.pagination?.total || 0}
          </div>

          {/* Articles */}
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 rounded-md">
            {articles.data && articles.data.map((article) => (
              <div key={article.id} className="bg-white flex flex-col gap-4"> 

                <div>
                  {article.image && article.image.url ? (
                      <img
                        src={getStrapiMedia(article.image.url)}
                        alt="cover image"
                        className="w-full object-cover cover-video"
                      />
                    ) : (
                      <p>Image non disponible</p>
                    )}
                </div>
                
                <div className="flex flex-col px-1 gap-2 pb-[10px]">
                  <Link href={`/nouveaute/${article.slug}`} className="underline curseur-pointer">               
                    
                    <h2>{article.title}</h2>
                  
                  </Link>

                  <div className="">
                    <p className="italic text-[12px]">Type: {article.type}</p>
                  </div>
                </div>
                  
              </div>

            ))}
          </div>
          {/* pagination */}         
          {totalPages > 0 && (
            <div className="flex justify-center items-center gap-4 mt-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-white px-3 py-1 rounded disabled:opacity-50"
              >
                Précédent
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1 
                        ? 'bg-gray-400 text-white' 
                        : 'bg-white'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
 
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="bg-white px-3 py-1 rounded disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterSearch
