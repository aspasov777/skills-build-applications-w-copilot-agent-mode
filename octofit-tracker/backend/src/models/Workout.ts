import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  durationMinutes: number;
  difficulty: string;
  focusArea: string;
  equipment: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    difficulty: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    equipment: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
