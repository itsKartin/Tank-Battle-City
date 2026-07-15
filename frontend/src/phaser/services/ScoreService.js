export default class ScoreService {
  static async submitScore(playerName, score, levelReached) {
    const response = await fetch('http://localhost:8000/api/scores/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player_name: playerName,
        score,
        level_reached: levelReached,
      }),
    });

    if (!response.ok) {
      throw new Error('No se pudo guardar el puntaje');
    }

    return response.json();
  }
}