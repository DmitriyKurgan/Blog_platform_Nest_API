import {Inject, Injectable} from '@nestjs/common';
import { Model, SortOrder } from 'mongoose';
import {PostDBModel} from "./types/getPost";
import {FindAllPostsDto} from "./queryDto/findAllPostsDto";
import { Paginated } from '../../common/paginated';
import {PostViewModel} from "./dto/getPost";

@Injectable()
export class PostsQueryRepository {
    constructor(
      @Inject('POST_MODEL')
      private postModel: Model<PostDBModel>,
    ) {}

    async getPosts(queryParams: FindAllPostsDto): Promise<Paginated<PostViewModel[]>> {

        const filter = queryParams.searchNameTerm ? { name: { $regex: queryParams.searchNameTerm, $options: 'i' } } : {}
        const sortOptions: Record<string, SortOrder> = queryParams.order as Record<string, SortOrder>

        const [totalCount, items]: [number, PostDBModel[]] = await Promise.all([
            this.postModel.countDocuments(filter),
            this.postModel
              .find(filter)
              .sort(sortOptions)
              .skip(queryParams.skip)
              .limit(queryParams.pageSize)
              .exec(),
        ])

        return Paginated.getPaginated({
            items: items.map(i => new PostViewModel(i)),
            count: totalCount,
            size: queryParams.pageSize,
            page: queryParams.pageNumber,
        })
    }

    async getPostByID(postID: string): Promise<PostViewModel | null> {
        const blog = await this.postModel.findById(postID).exec()

        if (!blog) return null

        return new PostViewModel(blog)
    }
}
