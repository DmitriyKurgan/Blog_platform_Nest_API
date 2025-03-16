import { Document } from 'mongoose';


export interface CommentDBModel extends Document {
  id: string,
  content: string,
  commentatorInfo: {
    userId: string,
    userLogin: string
  },
  createdAt: string,
  likesInfo: {
    likesCount: number,
    dislikesCount: number,
    myStatus: string
  }
}
