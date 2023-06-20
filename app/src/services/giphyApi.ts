export async function getGifs() {
  try {
    // const url = `https://api.giphy.com/v1/gifs/trending?api_key=YooJ3FkUNNkOort3XNhfPXaISWI1divo&rating=g&limit=1&offset=${param}`;

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
