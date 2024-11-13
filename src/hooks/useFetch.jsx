"use client"
import React, {useEffect, useState}  from 'react'

const useFetch = (url) => {

    
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
   

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {

                const res = await fetch(url, {
                        headers: {
                          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,  
                        },
                      }
            );
                const json = await res.json();

                
                setData(json.data);
                setLoading(false);


            
            } catch(error) {
                setError(error.message)
                setLoading(false)
            }
        }

        fetchData()
        
    },[url])


  return {loading, data, error};

}

export default useFetch
