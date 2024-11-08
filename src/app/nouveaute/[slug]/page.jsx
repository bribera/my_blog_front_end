"use client"
import React from 'react'
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import useFetch from '@/hooks/useFetch';
import Image from "next/image";
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import Button from '@/app/components/Button';

export const getStrapiMedia = (url) => {
  
  if (url?.startsWith('http')) {
    
    return url;
  }

  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_DOMAIN_URL || 'http://localhost:1337';
  
  const cleanUrl = url?.startsWith('/') ? url : `/${url}`;

  return `${apiUrl}${cleanUrl}`;
}

const VideoPlayer = ({ videoUrl }) => {
  const isYoutubeUrl = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (!videoUrl) return null;

  if (isYoutubeUrl(videoUrl)) {
    const videoId = getYoutubeId(videoUrl);
    return (
      <div className="aspect-video mb-8">
        <iframe
          className="w-full h-[400Px] rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="aspect-video mb-8">
      <video 
        controls 
        className="w-full h-full object-cover rounded-lg shadow-lg"
      >
        <source src={getStrapiMedia(videoUrl)} />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  );
};



const ArticleDetail = ({params}) => {

  const { slug } = params;
  const { data: articles, error, loading } = useFetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/articles?populate=*&filters[slug][$eq]=${slug}`);

  const [comment, setComment] = useState({ author: '', text: '' });
  const [comments, setComments] = useState([]);

  const [status, setStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment(prevComment => ({
      ...prevComment,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    setStatus({ isSubmitting: true, isSuccess: false, error: null });

    try{

      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            author: comment.author,
            text: comment.text,
            article: article.id
          }
        })        
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      const newComment = await response.json();
      setComments(prevComments => [...prevComments, newComment.data]);
      setComment({ author: '', text: '' });

    } catch(error){
      console.error('Error:', error);
      setErrors({ submit: 'Failed to send message' });
    } finally {
      setStatus({ isSubmitting: false, isSuccess: true, error: null });
    }

    
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  
  if (!articles || articles.length === 0) return <p>No articles found.</p>;
  

  const article = articles[0];

  console.log(3);
console.log(article);

  return (
    <div className="pt-[160px] pb-[60px] px-[60px] animate-plus">
      <div>
      
        <div className="flex flex-col gap-[10px] w-[530px] md:w-fit pb-[20px]">
          <h2 className="text-[49px] font-bold">{article.title}</h2>
          <div className="">
            <p className="text-[29px]">
              {article.undertitle}
            </p>
          </div>
        </div>
        <div className="pb-[20px]">

          <p className="italic text-[14px]">Edité par: {article.auteur.nom}</p>

          <p className="italic text-[14px]">{format(parseISO(article.date), 'MMMM dd, yyyy')}</p>
          
        </div>

        {article.attributes?.video?.data && (
          <VideoPlayer 
            videoUrl={article.attributes.video.data.attributes.url} 
            width={400}
            height={800}
          />
        )}

        {article.video && (
          <VideoPlayer 
            videoUrl={article.video} 
          />
        )}

        <BlocksRenderer
          content={article.description || []}
          blocks={{
            bold: ({ children }) => 
              <strong className="font-bold">
                {children}
              </strong>
            ,
            image: ({ image }) => {
              return (
              <div className="my-6 relative w-full">
                <Image
                  src={getStrapiMedia(image.url)}
                  alt={image.alternativeText || article.title}
                  width={image.width || 100}
                  height={image.height || 100}
                  className="rounded-lg shadow-md w-[600px] h-[500px]"
                />
              </div>
              );
            },
           
            paragraph: ({ children }) => 
              
                <p className="font-clarity font-[400] pb-[32px] md:pb-[13px] lg:pb-[24px] text-[20px] lg:text-[18px] leading-[34.38px] md:leading-[56.06px] lg:leading-[74.75px]">
                  {children}
                </p>
              
           
          }}
        />

        <div className="flex gap-2 text-[22px]">
          <p className='font-semibold'>Tags:</p>
          {
            article.tags.map(tag => tag.type).join(', ')
          }
        </div>


        <div className="py-[20px]">
          <p className="text-[40px] font-semibold">Commentaires</p>
        </div>

        <form onSubmit={handleCommentSubmit} className='bg-white/45 px-2 py-3 flex flex-col gap-[20px]'>
          <div className='flex flex-col gap-2'>
            <label className='text-[18px] font-semibold'>Nom</label>
            <input type="text" name="author" value={comment.author} onChange={handleCommentChange} required />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='text-[18px] font-semibold'>Comment:</label>
            <textarea name="text" value={comment.text} className='' onChange={handleCommentChange} required />
          </div>
          <Button type="submit">Envoyez</Button>
        </form>

        {submitted && <p className='text-green-500 font-medium italic'>Votre message a été envoyé avec succès !</p>}

      </div>
    </div>
  )
}

export default ArticleDetail
