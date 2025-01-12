import { Document } from 'mongoose';

export interface Blog extends Document {
  readonly name: string
  readonly description: number
  readonly websiteUrl: string
}
