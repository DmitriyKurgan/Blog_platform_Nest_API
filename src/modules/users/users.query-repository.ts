import {Inject, Injectable} from '@nestjs/common';
import { Model, SortOrder } from 'mongoose';
import {UserDBModel} from "./types/getUser";
import {FindAllUsersDto} from "./queryDto/findAllUsersDto";
import { Paginated } from '../../common/paginated';
import {UserViewModel} from "./dto/getUser";

@Injectable()
export class UsersQueryRepository {
    constructor(
      @Inject('USER_MODEL')
      private userModel: Model<UserDBModel>,
    ) {}

    async getUsers(queryParams: FindAllUsersDto): Promise<Paginated<UserViewModel[]>> {

        const filter = queryParams.searchNameTerm ? { name: { $regex: queryParams.searchNameTerm, $options: 'i' } } : {}
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

}
