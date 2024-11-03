

export async function fetchCategories() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/categories`);
    
    const data = await res.json();
    return data.data; 
  
}
  
  export async function fetchArticles(category, search) {

    const categoryFilter = category ? `&filters[category][id][$eq]=${category}` : '';
    const searchFilter = search ? `&filters[title][$containsi]=${search}` : '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/articles?populate=*&${categoryFilter}${searchFilter}`);
    const data = await res.json();

    console.log(data)
    
    return data.data; 
  }
  