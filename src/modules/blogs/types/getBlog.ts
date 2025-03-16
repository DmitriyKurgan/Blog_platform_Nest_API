import {Document, ObjectId} from 'mongoose';

export interface BlogDBModel extends Document {
  readonly _id: string | ObjectId
  readonly name: string
  readonly description: number
  readonly websiteUrl: string
  readonly createdAt: Date
  readonly isMembership: boolean
}
