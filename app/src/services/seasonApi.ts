interface createSeason {
  startDate: string;
  endDate: string;
}

export async function createSeason(body: createSeason) {
  try {
    const url = 'http://localhost:8000/api/season';
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.log('Something went wrong while creating a season', error);
  }
}
