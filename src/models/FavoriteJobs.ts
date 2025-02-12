import mongoose, { Schema, model, models } from 'mongoose';

const FavoriteJobsSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  favorites: { type: [String], default: [] },
}, {
  timestamps: true,
});

export const FavoriteJobsModel = models?.FavoriteJobs || model('FavoriteJobs', FavoriteJobsSchema);
