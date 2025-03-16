import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [30, 'Title cannot exceed 30 characters'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [100, 'Short description cannot exceed 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      maxlength: [1000, 'Content cannot exceed 1000 characters'],
    },
    blogId: {
      type: String,
      required: [true, 'Blog ID is required'],
    },
    blogName: {
      type: String,
      required: [true, 'Blog Name is required'],
    },
    createdAt: {
      type: String,
    },
    extendedLikesInfo: {
      likesCount: {
        type: Number,
        default: 0,
      },
      dislikesCount: {
        type: Number,
        default: 0,
      },
      myStatus: {
        type: String,
        default: 'none',
      },
      newestLikes: {
        type: Array,
        default: [],
      },
    },
  },
  { versionKey: false },
)