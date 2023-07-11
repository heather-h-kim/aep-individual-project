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
    const facts = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      facts.push(jsonResponse[i].fact);
    }
    // console.log('jsonResponse is', jsonResponse);
    // console.log('facts is', facts);
    return facts;
  } catch (error) {
    console.log('Something went wrong', error);
  }
}
