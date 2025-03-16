import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        commentatorInfo: {
            userId: {
                type: String,
                required: [true, 'User ID is required'],
            },
            userLogin: {
                type: String,
                required: [true, 'User login is required'],
            },
        },
        createdAt: {
            type: String,
            required: true,
        },
        likesInfo: {
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
                enum: ['None', 'Like', 'Dislike'],
                default: 'None',
            },
        },
    },
    { versionKey: false },
);