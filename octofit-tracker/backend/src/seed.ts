import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { LeaderboardEntry } from './models/LeaderboardEntry';
import { Workout } from './models/Workout';

dotenv.config();

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
  ]);

  const team = await Team.create({
    name: 'Peak Performance',
    description: 'A team focused on strength and endurance challenges.',
    members: [users[0]._id, users[1]._id],
    createdBy: users[0]._id,
  });

  await Activity.create([
    { user: users[0]._id, type: 'Run', durationMinutes: 30, distanceKm: 5, calories: 320, date: new Date() },
    { user: users[1]._id, type: 'Cycling', durationMinutes: 45, distanceKm: 18, calories: 410, date: new Date() },
  ]);

  await LeaderboardEntry.create([
    { user: users[0]._id, team: team._id, score: 980, streak: 7 },
    { user: users[1]._id, team: team._id, score: 945, streak: 4 },
    { user: users[2]._id, score: 900, streak: 3 },
  ]);

  await Workout.create([
    { name: 'HIIT Cardio', description: 'Short burst intervals for speed.', durationMinutes: 20, difficulty: 'Intermediate', focusArea: 'Cardio', equipment: ['Jump rope'] },
    { name: 'Core Strength', description: 'Core-focused bodyweight circuit.', durationMinutes: 25, difficulty: 'Beginner', focusArea: 'Core', equipment: ['Mat'] },
  ]);

  console.log('Seed data created');
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
