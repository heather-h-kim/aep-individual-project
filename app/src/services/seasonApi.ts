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

export async function getAllSeasons() {
  try {
    const url = 'http://localhost:8000/api/seasons';
    const response = await fetch(url, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    const jsonResponse = response.json();
    console.log('all seasons', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong while getting all seasons', error);
  }
}

export async function getSeasonsToDate() {
  try {
    const url = 'http://localhost:8000/api/seasons/toDate';
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    });
    const jsonResponse = await response.json();
    console.log('seasons to date', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong while getting seasons  to date', error);
  }
}

export async function getCurrentSeason() {
  try {
    const url = 'http://localhost:8000/api/season/currentSeason';
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'GET',
    });
    const jsonResponse = await response.json();
    console.log('current season', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong while getting the current season', error);
  }
}
