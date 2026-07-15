const TILE_TYPE_MAP = {
  5: 'brick',
  6: 'steel',
  7: 'water'
};

export default class MapLoader {
  static load(scene, tilemapKey, wallsGroup, watersGroup) {
    const map = scene.make.tilemap({ key: tilemapKey });
    const tileLayer = map.getLayer('Tile Layer 1').data;

    tileLayer.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        const type = TILE_TYPE_MAP[tile.index];
        if (!type) return;

        const x = colIndex * 32 + 16;
        const y = rowIndex * 32 + 16;

        if (type === 'brick') {
          wallsGroup.add(new BrickWall(scene, x, y, 'sheet', Frames.BRICK));
        } else if (type === 'steel') {
          wallsGroup.add(new SteelWall(scene, x, y, 'sheet', Frames.STEEL));
        } else if (type === 'water') {
          watersGroup.add(new Water(scene, x, y, 'sheet', Frames.WATER_A));
        }
      });
    });

    const spawnPoints = { player1: null, player2: null, enemies: [], base: null };
    const entityLayer = map.getObjectLayer('Entities');

    entityLayer.objects.forEach(obj => {
      const x = obj.x + 16;
      const y = obj.y + 16;

      if (obj.type === 'player1_spawn') spawnPoints.player1 = { x, y };
      else if (obj.type === 'player2_spawn') spawnPoints.player2 = { x, y };
      else if (obj.type === 'enemy_spawn') spawnPoints.enemies.push({ x, y });
      else if (obj.type === 'base') spawnPoints.base = { x, y };
    });

    return spawnPoints;
  }
}