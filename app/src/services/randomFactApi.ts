export async function getRandomFacts() {
  try {
    const url = `http://localhost:8000/api/randomFacts`;
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    });
    const jsonResponse = await response.json();
    const { fact } = jsonResponse[0];
    // console.log(fact);
    return fact;
  } catch (error) {
    console.log('Something went wrong', error);
  }
}
