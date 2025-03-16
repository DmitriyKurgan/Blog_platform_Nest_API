import { Document } from 'mongoose';

export interface Post extends Document {
  readonly title: string
  readonly shortDescription: string
  readonly content: string
  readonly blogId: string
}
