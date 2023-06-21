export async function getGifs() {
  try {
    const url = `http://localhost:8000/api/giphy`;
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong', error);
  }
}
