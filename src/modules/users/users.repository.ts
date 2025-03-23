import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {UserDBModel} from "./types/getUser";
import {User} from "./types/createUser";
@Injectable()
export class UsersRepository {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserDBModel>,
    ) {}

    async createUser (userData: Partial<User>): Promise<User>{
        const createdUser = new this.userModel(userData)
        return createdUser.save()
    }

    async deleteUser(userID: string): Promise<User | null>{
        return this.userModel.findByIdAndDelete(userID)
    }
}
