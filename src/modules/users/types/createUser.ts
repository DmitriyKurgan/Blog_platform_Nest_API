import { Document } from 'mongoose';

export interface User extends Document {
  readonly id: string
  readonly login: string
  readonly email: string
  readonly createdAt: string
}

