export interface createSeason {
  start_date: number;
  end_date: number;
}

export interface updateSeason {
  season_id: number;
  start_date?: number | undefined;
  end_date?: number | undefined;
}

export async function createNewSeason(body: createSeason) {
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
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong while creating a season', error);
  }
}

export async function deleteSeason(seasonId: number) {
  try {
    const url = `http://localhost:8000/api/season/${seasonId}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong while creating a season', error);
  }
}

export async function updateSeason(body: updateSeason) {
  try {
    const url = 'http://localhost:8000/api/season';
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
    console.log('Something went wrong while updating a season', error);
  }
}
