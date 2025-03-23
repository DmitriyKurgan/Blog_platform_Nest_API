import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
      login: {
      type: String,
      required: [true, 'Login is required'],
      minlength: [3, 'Login cannot be shorter than 3 characters'],
      maxlength: [10, 'Login cannot exceed 30 characters'],
      match: [/^[a-zA-Z0-9_-]*$/, 'Login can only contain letters, numbers, underscores, and dashes'],
    },
      email: {
          type: String,
          required: [true, 'Email is required'],
          validate: {
              validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
              message: 'Invalid email format',
          },
      },
      password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password cannot be shorter than 3 characters'],
      maxlength: [20, 'Password cannot exceed 20 characters'],
    },

    createdAt: {
      type: String,
    },
  },
  { versionKey: false },
)