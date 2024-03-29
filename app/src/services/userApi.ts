export interface createUser {
  first_name?: string;
  last_name?: string;
  email: string;
  auth0token: string;
  username: string;
}

export async function addUser(body: createUser) {
  try {
    const url = 'http://localhost:8000/api/user';
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong', error);
  }
}

export interface updateUser {
  user_id?: number | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  email?: string | undefined;
  username?: string | undefined;
  bgcolor?: string | undefined;
  fgcolor?: string | undefined;
}

export async function updateUserProfile(body: updateUser) {
  try {
    const url = `http://localhost:8000/api/user`;
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong', error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const url = `http://localhost:8000/api/users`;
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    });

    const jsonResponse = await response.json();
    console.log('all users', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong', error);
    throw error;
  }
}
