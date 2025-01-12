import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [15, 'Name cannot exceed 15 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    websiteUrl: {
      type: String,
      required: [true, 'Website URL is required'],
      maxlength: [100, 'Website URL cannot exceed 100 characters'],
      match: [
        /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
        'Website URL must be a valid HTTPS URL',
      ],
    },
  },
  { versionKey: false },
);
