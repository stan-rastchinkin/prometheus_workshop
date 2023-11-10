import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL;
const RECOMMENDATION_URL = `${SERVER_URL}/recommendation`;
const GENRES_URL = `${SERVER_URL}/genres`;

if (!SERVER_URL) {
  throw new Error('SERVER_URL is not defined');
}

const waitArbitraryTime = (
  minDelayMs: number,
  maxDelayMs: number,
): Promise<void> => {
  const rangeMs = maxDelayMs - minDelayMs;
  const delay = minDelayMs + Math.round(Math.random() * rangeMs);

  return new Promise((res) => setTimeout(res, delay));
};

const pollInLoop = async (
  url: string,
  minDelayMs: number,
  maxDelayMs: number,
) => {
  while (true) {
    await waitArbitraryTime(minDelayMs, maxDelayMs);

    if (Math.random() > 0.5) {
      const { data } = await axios.get(url);
      console.log(data);
    }
  }
};

pollInLoop(RECOMMENDATION_URL, 10, 100);
pollInLoop(GENRES_URL, 1000, 2000);
