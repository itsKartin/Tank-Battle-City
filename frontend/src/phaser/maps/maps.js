export const TILE_SIZE = 32;

export const LEGEND = {
  '.': null,
  '#': 'brick',
  'S': 'steel',
  'W': 'water',
  'M': 'smoke',
  'P': 'player1',
  'p': 'player2',
  'E': 'enemySpawn',
  'B': 'base'
};

export const MAP_1 = [
  "SSSSSSSSSSSSSSSSSSSSSSSSS",
  "S..E........E........E..S",
  "S.......................S",
  "S..##...............##..S",
  "S.####...SSSSSSS...####.S",
  "S..##...............##..S",
  "S.....###.......###.....S",
  "S.........#####.........S",
  "SSSSSSS..#######..SSSSSSS",
  "S.........#####.........S",
  "S.......................S",
  "S..####............###..S",
  "S.######.SSSSSSS..#####.S",
  "S..####............###..S",
  "S.........#####.........S",
  "S..P......#####......p..S",
  "S.........##B##.........S",
  "SSSSSSSSSSSSSSSSSSSSSSSSS",
];

export const MAP_2 = [
  "SSSSSSSSSSSSSSSSSSSSSSSSS",
  "S..E........E........E..S",
  "S.......................S",
  "S........S..###S........S",
  "S........S#..##S........S",
  "S...SSSSSS#..##S...SSSSSS",
  "S...##...S##..#S...##...S",
  "S...##...S###..S...##...S",
  "SMMMM....S####.SMMMM....S",
  "SMMMM....S##...SMMMM....S",
  "SSSSSS...S...##SSSSSS...S",
  "S....#...S..###S........S",
  "S....#..................S",
  "S.......................S",
  "S.........#####.........S",
  "S..P......#####......p..S",
  "S.........##B##.........S",
  "SSSSSSSSSSSSSSSSSSSSSSSSS",
];

export const MAP_3 = [
  "SSSSSSSSSSSSSSSSSSSSSSSSS",
  "S.............#.........S",
  "S.E......#...###......E.S",
  "S.......###...#.......SSS",
  "S........#..............S",
  "S.......................S",
  "S.....SSS......SSWWWWWWWS",
  "S.......SSS..SSS........S",
  "S.........SSSS##....####S",
  "S............###....####S",
  "S.............##........S",
  "S..####.................S",
  "S..####.............P...S",
  "S....##S................S",
  "S....##S..#####.....p...S",
  "S.E....S..#####.........S",
  "S......S..##B##.........S",
  "SSSSSSSSSSSSSSSSSSSSSSSSS",
];

export const MAP_4 = [
  "SSSSSSSSSSSSSSSSSSSSSSSSS",
  "S.......MMMMMMMM........S",
  "S.......MMMMMMMM.##..P..S",
  "S.......MMMMMMMM.##.....S",
  "S.......SSSSSSSS.##.....S",
  "S....S.......##.........S",
  "S.E..S....W..##....##SSSS",
  "S....S....W..##....###..S",
  "S....S....W........###.BS",
  "S....SE...W........###..S",
  "S....S....W..##....###..S",
  "S.E..S....W..##....###SSS",
  "S....S.......##.........S",
  "S.......SSSSSSS..##.....S",
  "S.......MMMMMMM..##.....S",
  "S.......MMMMMMM..##..p..S",
  "S.......MMMMMMM.........S",
  "SSSSSSSSSSSSSSSSSSSSSSSSS",
];

export function buildMap(scene, layout) {
  const walls = [];
  const smokeSpots = [];
  const spawnPoints = [];
  let player1Start = { x: 100, y: 100 };
  let player2Start = { x: 700, y: 500 };
  let basePosition = { x: 400, y: 580 };

  layout.forEach((row, rowIndex) => {
    row.split('').forEach((char, colIndex) => {
      const x = colIndex * TILE_SIZE + TILE_SIZE / 2;
      const y = rowIndex * TILE_SIZE + TILE_SIZE / 2;
      const type = LEGEND[char];

      if (type === 'brick' || type === 'steel' || type === 'water') {
        walls.push({ type, x, y });
      } else if (type === 'smoke') {
        smokeSpots.push({ x, y });
      } else if (type === 'enemySpawn') {
        spawnPoints.push({ x, y });
      } else if (type === 'player1') {
        player1Start = { x, y };
      } else if (type === 'player2') {
        player2Start = { x, y };
      } else if (type === 'base') {
        basePosition = { x, y };
      }
    });
  });

  return { walls, smokeSpots, spawnPoints, player1Start, player2Start, basePosition };
}