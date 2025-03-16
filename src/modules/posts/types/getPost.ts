import { Document } from 'mongoose';

export class Likes {
  addedAt: string
  userId: string
  login: string
}

export interface PostDBModel extends Document {
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly blogId: string
  readonly blogName: string
  readonly createdAt: Date
  readonly extendedLikesInfo: {
    likesCount: number
    dislikesCount: number
    myStatus: string
    newestLikes: Likes[]
  }

}
