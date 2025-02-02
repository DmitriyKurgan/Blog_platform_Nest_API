import { Document } from 'mongoose';

export interface BlogDBModel extends Document {
  readonly name: string
  readonly description: number
  readonly websiteUrl: string
  readonly createdAt: Date
  readonly isMembership: boolean
}
