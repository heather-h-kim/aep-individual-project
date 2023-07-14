export async function getRankings(seasonId) {
  try {
    const url = `http://localhost:8000/api/games/${seasonId}`;
    const response = await fetch(url, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong while getting rankings', error);
  }
}

export async function getSeasons() {
  try {
    const url = 'http://localhost:8000/api/seasons';
    const response = await fetch(url, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    const jsonResponse = response.json();
    // console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong while getting all seasons', error);
  }
}
