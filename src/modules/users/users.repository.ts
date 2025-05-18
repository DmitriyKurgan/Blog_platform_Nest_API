import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {UserDBModel} from "./types/getUser";
import {User} from "./types/createUser";
import {UserViewModel} from "./dto/getUser";
@Injectable()
export class UsersRepository {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserDBModel>,
    ) {}

    async createUser (userData: Partial<User>): Promise<UserViewModel>{
        const createdUser = new this.userModel(userData)
        const dbUser = await  createdUser.save()

        return new UserViewModel(dbUser)
    }

    async deleteUser(userID: string): Promise<User | null>{
        return this.userModel.findByIdAndDelete(userID)
    }
}
