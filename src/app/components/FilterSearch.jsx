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

  // useEffect(() => {
    
  //   fetchCategories().then(data => setCategories(data));

  // }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        console.log('Fetched categories:', categoriesData); // Debug log
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    loadCategories();
  }, []);

  // useEffect(() => {
    
  //   fetchArticles(selectedCategory, searchTerm).then(data => setArticles(data));
    
  // }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const articlesData = await fetchArticles(selectedCategory, searchTerm);
        console.log('Fetched articles:', articlesData); // Debug log
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
      setLoading(false);
    };

    loadArticles();
  }, [selectedCategory, searchTerm]);


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
        </div>
      </div>
    </div>
  )
}

export default FilterSearch
