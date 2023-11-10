import { Router } from 'express';
import { faker } from '@faker-js/faker';

import { genres, getRandomGenre } from './get-data.js';

const router = Router();

router.get('/recommendation', (_req, res) => {
  res.json({
    artist: faker.person.fullName(),
    genre: getRandomGenre(),
    trackName: faker.music.songName(),
  });
});

router.get('/genres', (_req, res) => {
  res.json(genres);
});

export default router;
