import {Inject, Injectable} from '@nestjs/common';
import { Model, SortOrder } from 'mongoose';
import {UserDBModel} from "./types/getUser";
import {FindAllUsersDto} from "./queryDto/findAllUsersDto";
import { Paginated } from '../../common/paginated';
import {UserViewModel} from "./dto/getUser";
import {PostViewModel} from "../posts/dto/getPost";

@Injectable()
export class UsersQueryRepository {
    constructor(
      @Inject('USER_MODEL')
      private userModel: Model<UserDBModel>,
    ) {}

    async getUsers(queryParams: FindAllUsersDto): Promise<Paginated<UserViewModel[]>> {

        const filter: any = {}

        const orConditions: any[] = []

        if (queryParams.searchLoginTerm) {
            orConditions.push({ login: { $regex: queryParams.searchLoginTerm, $options: 'i' } })
        }

        if (queryParams.searchEmailTerm) {
            orConditions.push({ email: { $regex: queryParams.searchEmailTerm, $options: 'i' } })
        }

        if (queryParams.searchNameTerm) {
            orConditions.push({ name: { $regex: queryParams.searchNameTerm, $options: 'i' } })
        }

        if (orConditions.length > 0) {
            filter.$or = orConditions
        }

        const sortOptions: Record<string, SortOrder> = queryParams.order as Record<string, SortOrder>

        const [totalCount, items]: [number, UserDBModel[]] = await Promise.all([
            this.userModel.countDocuments(filter),
            this.userModel
              .find(filter)
              .sort(sortOptions)
              .skip(queryParams.skip)
              .limit(queryParams.pageSize)
              .exec(),
        ])

        return Paginated.getPaginated({
            items: items.map(i => new UserViewModel(i)),
            count: totalCount,
            size: queryParams.pageSize,
            page: queryParams.pageNumber,
        })
    }

    async getUserByID(userID: string): Promise<UserViewModel | null> {
        const user = await this.userModel.findById(userID).exec()

        if (!user) return null

        return new UserViewModel(user)
    }

}
