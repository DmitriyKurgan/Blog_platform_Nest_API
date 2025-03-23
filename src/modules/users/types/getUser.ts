import {Document, ObjectId} from 'mongoose';

export interface UserDBModel extends Document {
  readonly _id: string | ObjectId
  readonly id: string
  readonly login: string
  readonly email: string
  readonly createdAt: string
}
