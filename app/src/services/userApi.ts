export interface createUser {
  first_name: string;
  last_name: string;
  email: string;
  auth0token: string;
  username: string;
}

export async function addUser(data: createUser) {
  try {
    const url = 'http://localhost:8000/api/users';
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    // console.log(response);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong', error);
    // throw error;
  }
}

// export async function getUserByToken(token) {
//   console.log(token);
//   try {
//     const url = `http://localhost:8000/api/user/auth0/${token}`;
//     const response = await fetch(url, {
//       headers: {
//         'content-type': 'application/json',
//       },
//       method: 'GET',
//     });
//     console.log(response);
//     const jsonResponse = await response.json();
//     console.log(jsonResponse);
//   } catch (error) {
//     console.log('Something went wrong', error);
//     throw error;
//   }
// }
