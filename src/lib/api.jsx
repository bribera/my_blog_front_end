

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

export const loginUser = async (identifier, password) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: identifier, 
        password: password
      }),
    });

    const data = await response.json();

    const token = data.jwt;
    const user = data.user;

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return data;
  
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// export const getUser = async (token) => {
//   // const authToken = await getAuthtoken();
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/users/me`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       // body:JSON.stringtify({
//       //   ...identifier= identifier,
//       //   ...password = password,
//       // }),
//     });
//     const data = await response.json();
//     console.log("12");
//     console.log(data);
//     return data;

//   } catch (error) {
//     console.log("error", error)
//     throw error
    
//   }
  
// };

  