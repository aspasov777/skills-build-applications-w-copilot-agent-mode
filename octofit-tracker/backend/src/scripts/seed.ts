import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

dotenv.config();

// Seed the octofit_db database with test data
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const seed = async () => {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { username: 'maria', email: 'maria@example.com', name: 'Maria Chen' },
    { username: 'joel', email: 'joel@example.com', name: 'Joel Rivera' },
    { username: 'sara', email: 'sara@example.com', name: 'Sara Patel' },
    { username: 'david', email: 'david@example.com', name: 'David Kim' },
  ]);

  const team = await Team.create({
    name: 'Peak Performance',
    description: 'Strength and endurance group for ambitious athletes.',
    members: [users[0]._id, users[1]._id, users[2]._id],
    createdBy: users[0]._id,
  });

  await Activity.create([
    { user: users[0]._id, type: 'Run', durationMinutes: 35, distanceKm: 6.2, calories: 380, date: new Date('2026-06-20') },
    { user: users[1]._id, type: 'Cycling', durationMinutes: 50, distanceKm: 22, calories: 460, date: new Date('2026-06-21') },
    { user: users[2]._id, type: 'Yoga', durationMinutes: 30, distanceKm: 0, calories: 180, date: new Date('2026-06-22') },
    { user: users[3]._id, type: 'Strength', durationMinutes: 45, distanceKm: 0, calories: 320, date: new Date('2026-06-23') },
  ]);

  await LeaderboardEntry.create([
    { user: users[0]._id, team: team._id, score: 980, streak: 7 },
    { user: users[1]._id, team: team._id, score: 945, streak: 4 },
    { user: users[2]._id, team: team._id, score: 912, streak: 3 },
    { user: users[3]._id, score: 901, streak: 2 },
  ]);

  await Workout.create([
    { name: 'HIIT Cardio', description: 'Short burst intervals designed for speed and stamina.', durationMinutes: 20, difficulty: 'Intermediate', focusArea: 'Cardio', equipment: ['Jump rope', 'Timer'] },
    { name: 'Core Strength', description: 'Core-focused bodyweight circuit for better posture.', durationMinutes: 25, difficulty: 'Beginner', focusArea: 'Core', equipment: ['Mat'] },
    { name: 'Recovery Flow', description: 'Gentle mobility and flexibility session.', durationMinutes: 30, difficulty: 'Beginner', focusArea: 'Mobility', equipment: ['Yoga mat'] },
  ]);

  console.log('Seed the octofit_db database with test data');
  console.log('Seed data created successfully');
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
