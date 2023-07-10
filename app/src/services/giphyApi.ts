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
    // console.log(
    //   'gifs are',
    //   jsonResponse.data[0].images.original.url,
    //   jsonResponse.data[1].images.original.url,
    // );
    return [
      jsonResponse.data[0].images.original.url,
      jsonResponse.data[1].images.original.url,
    ];
  } catch (error) {
    console.log('Something went wrong', error);
  }
}
