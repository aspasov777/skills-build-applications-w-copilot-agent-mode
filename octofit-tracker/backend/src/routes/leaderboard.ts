import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find().populate('user').populate('team').sort({ score: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create leaderboard entry', error });
  }
});

export default router;
