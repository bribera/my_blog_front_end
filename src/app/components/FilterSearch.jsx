'use client'
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from 'react';
import { fetchCategories, fetchArticles } from '@/lib/api';


export const getStrapiMedia = (url) => {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL;
  return `${baseUrl}${url}`; 
};



const FilterSearch = () => {
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(2)


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


  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const articlesData = await fetchArticles(selectedCategory, searchTerm, page, pageSize);
        setArticles(articlesData);
        setTotalPages(articles.meta.pagination.pageCount);
      } catch (error) {
       error
      }
      setLoading(false);
    };

    loadArticles();
  }, [selectedCategory, searchTerm, page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  return (
    <div className=''>
      <div className="flex">
        {/* Filter par categories */}
        <div className="basis-[25%]">
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className='lg:w-[180px] md:w-[100px] py-[10px]'>
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
          {/* Articles */}
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 rounded-md">
            {articles && articles.map((article) => (
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
            <div className="flex justify-between items-center mt-4">
              <button className='bg-white px-2 py-1 rounded-sm disabled:bg-slate-500' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
              <span>Page <span className="bg-gray-300 px-2 py-1 rounded-sm">{page}</span> of <span className="bg-gray-400 px-2 py-1 rounded-sm">{totalPages}</span></span>
              <button className='bg-white px-2 py-1 rounded-sm disabled:bg-slate-500' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSearch
