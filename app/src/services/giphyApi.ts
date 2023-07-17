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
    const gifs = [];
    for (let i = 0; i < jsonResponse.data.length; i++) {
      gifs.push(jsonResponse.data[i].images.original.url);
    }
    console.log(gifs);
    return gifs;
  } catch (error) {
    console.log('Something went wrong while getting gifs', error);
  }
}
