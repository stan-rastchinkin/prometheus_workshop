import { Router } from 'express';
import { faker } from '@faker-js/faker';
// TODO: Import Histogram metric
import promClient, { Counter /*, Histogram*/ } from 'prom-client';

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

// #########################
// # Prometheus Instrumentation
// #########################

const genresRequestsCounter = new Counter({
  name: 'genres_requests_counter',
  help: 'Number of requests to /genres route',
});

// TODO: create a new Histogram for tracking the duration of requests
// to the /recommendation route

// const recommendationRequestDurationHistogram = new Histogram({
//   name: 'recommendation_duration_seconds',
//   help: 'Duration of requests to /recommendation in seconds',
// });

// #########################
// # Application Routes
// #########################

router.get('/recommendation', async (_req, res) => {
  // TODO: use the built-in timers functionality

  // const stopTimer = recommendationRequestDurationHistogram.startTimer();
  await waitArbitraryTime(100, 2000);
  // stopTimer();

  res.json({
    artist: faker.person.fullName(),
    genre: getRandomGenre(),
    trackName: faker.music.songName(),
  });
});

router.get('/genres', async (_req, res) => {
  await waitArbitraryTime(50, 1000);
  genresRequestsCounter.inc();
  res.json(genres);
});

router.get('/', (_req, res) => {
  res.redirect('/recommendation');
});

// #########################
// # Metrics
// #########################

router.get('/metrics', async (_req, res) => {
  const register = promClient.register;
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export default router;
