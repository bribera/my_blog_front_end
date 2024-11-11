

export async function fetchCategories() {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/categories?populate=*`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
      error
    throw error;
  }
  
}
  
export async function fetchArticles({categorie, searchTerm}) {
  let url = `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/articles?populate=*`;
  
if (categorie) {
  url += `&filters[categorie][id][$eq]=${categorie}`;
}

if (searchTerm) {
  url += `&filters[title][$containsi]=${searchTerm}`;
}

  
  const res = await fetch(url);
  const data = await res.json();

  console.log(data)
  
  return data.data; 
}

export const registerUser = async (userData) => {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;


  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
   
    return data;

  
  } catch (error) {
    throw error;
  }

};

export const getUser = async (token) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

  