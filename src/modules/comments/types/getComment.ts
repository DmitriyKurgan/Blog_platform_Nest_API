import {Document, ObjectId} from 'mongoose';


export interface CommentDBModel extends Document {
  _id: string | ObjectId,
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
