"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const entries = await LeaderboardEntry_1.LeaderboardEntry.find().populate('user').populate('team').sort({ score: -1 });
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const entry = await LeaderboardEntry_1.LeaderboardEntry.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ message: 'Failed to create leaderboard entry', error });
    }
});
exports.default = router;
