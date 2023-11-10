import { Router } from 'express';
import { faker } from '@faker-js/faker';

import { genres, getRandomGenre } from './get-data.js';

const router = Router();

const waitArbitraryTime = (
  minDelayMs: number,
  maxDelayMs: number,
): Promise<void> => {
  const rangeMs = maxDelayMs - minDelayMs;
  const delay = minDelayMs + Math.round(Math.random() * rangeMs);

  return new Promise((res) => setTimeout(res, delay));
};

router.get('/recommendation', async (_req, res) => {
  await waitArbitraryTime(100, 2000);
  res.json({
    artist: faker.person.fullName(),
    genre: getRandomGenre(),
    trackName: faker.music.songName(),
  });
});

router.get('/genres', async (_req, res) => {
  await waitArbitraryTime(50, 1000);
  res.json(genres);
});

export default router;
