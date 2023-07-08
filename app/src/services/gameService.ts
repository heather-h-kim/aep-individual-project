export async function postGame() {
  try {
    const url = `http://localhost:8000/api/game`;
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong', error);
  }
}
