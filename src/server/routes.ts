import { Router } from 'express';
import { faker } from '@faker-js/faker';
import promClient, { Counter, Histogram } from 'prom-client';

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

const recommendationRequestDurationHistogram = new Histogram({
  name: 'recommendation_duration_seconds',
  help: 'Duration of requests to /recommendation in seconds',
});

const recommendationCounter = new Counter({
  name: 'recommendation_count',
  help: 'The number of recommendations per genre',
  labelNames: ['genre'],
});

// #########################
// # Application Routes
// #########################

router.get('/recommendation', async (_req, res) => {
  const stopTimer = recommendationRequestDurationHistogram.startTimer();
  await waitArbitraryTime(100, 2000);
  stopTimer();

  const recommendation = {
    artist: faker.person.fullName(),
    genre: getRandomGenre(),
    trackName: faker.music.songName(),
  };

  res.json(recommendation);

  recommendationCounter.labels(recommendation.genre).inc();
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
