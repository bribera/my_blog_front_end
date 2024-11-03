

export async function fetchCategories() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/categories?populate=*`);
    
    const data = await res.json();
    return data.data; 
  
}
  
  export async function fetchArticles(categorie, search) {
    let url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/articles?populate=*`;


    
  if (categorie) {
    url += `&filters[categorie][id][$eq]=${categorie}`;
  }
  
  if (search) {
    url += `&filters[title][$containsi]=${search}`;
  }
    
    const res = await fetch(url);
    const data = await res.json();

    console.log(data)
    
    return data.data; 
  }
  