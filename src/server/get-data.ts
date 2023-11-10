export const genres = [
  'Jazz',
  'Funk',
  'Gabber',
  'Soul',
  'RnB',
  'Epic Progressive Pagan Folk Doom Heathen Symphonic Black Metal',
  'Classic Rock',
];

export const getRandomGenre = (): string =>
  genres[Math.floor(Math.random() * genres.length)];
