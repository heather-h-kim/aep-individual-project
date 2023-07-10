import { roundObject, levelObject } from '../store/gameStore';

// export interface round {
//   round_number: number;
//   number_shown: number;
//   number_entered: number;
// }

// export interface levelObject {
//   $level_number: number;
//   $rounds: roundObject[];
// }

// export interface game {
//   played_at: number;
//   user_id: number | undefined;
//   $levels_rounds: {
//     $level_number: number;
//     $rounds: {
//       $round_number: number;
//       $number_shown: number;
//       $number_entered: number;
//     }[];
//   }[];
// }

export interface game {
  played_at: number;
  user_id: number | undefined;
  level_number: number;
  rounds: roundObject[];
}

export async function postGame(body: game) {
  try {
    const url = `http://localhost:8000/api/game`;
    const response = await fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    console.log(body);
    console.log(JSON.stringify(body));
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.log('Something went wrong', error);
  }
}
