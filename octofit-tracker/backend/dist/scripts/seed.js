"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
// Seed the octofit_db database with test data
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const seed = async () => {
    await mongoose_1.default.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        LeaderboardEntry_1.LeaderboardEntry.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    const users = await User_1.User.create([
        { username: 'maria', email: 'maria@example.com', name: 'Maria Chen' },
        { username: 'joel', email: 'joel@example.com', name: 'Joel Rivera' },
        { username: 'sara', email: 'sara@example.com', name: 'Sara Patel' },
        { username: 'david', email: 'david@example.com', name: 'David Kim' },
    ]);
    const team = await Team_1.Team.create({
        name: 'Peak Performance',
        description: 'Strength and endurance group for ambitious athletes.',
        members: [users[0]._id, users[1]._id, users[2]._id],
        createdBy: users[0]._id,
    });
    await Activity_1.Activity.create([
        { user: users[0]._id, type: 'Run', durationMinutes: 35, distanceKm: 6.2, calories: 380, date: new Date('2026-06-20') },
        { user: users[1]._id, type: 'Cycling', durationMinutes: 50, distanceKm: 22, calories: 460, date: new Date('2026-06-21') },
        { user: users[2]._id, type: 'Yoga', durationMinutes: 30, distanceKm: 0, calories: 180, date: new Date('2026-06-22') },
        { user: users[3]._id, type: 'Strength', durationMinutes: 45, distanceKm: 0, calories: 320, date: new Date('2026-06-23') },
    ]);
    await LeaderboardEntry_1.LeaderboardEntry.create([
        { user: users[0]._id, team: team._id, score: 980, streak: 7 },
        { user: users[1]._id, team: team._id, score: 945, streak: 4 },
        { user: users[2]._id, team: team._id, score: 912, streak: 3 },
        { user: users[3]._id, score: 901, streak: 2 },
    ]);
    await Workout_1.Workout.create([
        { name: 'HIIT Cardio', description: 'Short burst intervals designed for speed and stamina.', durationMinutes: 20, difficulty: 'Intermediate', focusArea: 'Cardio', equipment: ['Jump rope', 'Timer'] },
        { name: 'Core Strength', description: 'Core-focused bodyweight circuit for better posture.', durationMinutes: 25, difficulty: 'Beginner', focusArea: 'Core', equipment: ['Mat'] },
        { name: 'Recovery Flow', description: 'Gentle mobility and flexibility session.', durationMinutes: 30, difficulty: 'Beginner', focusArea: 'Mobility', equipment: ['Yoga mat'] },
    ]);
    console.log('Seed the octofit_db database with test data');
    console.log('Seed data created successfully');
    await mongoose_1.default.disconnect();
};
seed().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
