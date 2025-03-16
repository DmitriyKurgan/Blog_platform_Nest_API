import {Inject, Injectable} from '@nestjs/common';
import { Model, SortOrder } from 'mongoose';
import {FindAllCommentsDto} from "./queryDto/findAllCommentsDto";
import { Paginated } from '../../common/paginated';
import {CommentDBModel} from "./types/getComment";
import {CommentViewModel} from "./dto/getComment";

@Injectable()
export class CommentsQueryRepository {
    constructor(
      @Inject('COMMENT_MODEL')
      private commentModel: Model<CommentDBModel>,
    ) {}

    async getComments(queryParams: FindAllCommentsDto): Promise<Paginated<CommentViewModel[]>> {

        const filter = queryParams.searchNameTerm ? { name: { $regex: queryParams.searchNameTerm, $options: 'i' } } : {}
        const sortOptions: Record<string, SortOrder> = queryParams.order as Record<string, SortOrder>

        const [totalCount, items]: [number, CommentDBModel[]] = await Promise.all([
            this.commentModel.countDocuments(filter),
            this.commentModel
              .find(filter)
              .sort(sortOptions)
              .skip(queryParams.skip)
              .limit(queryParams.pageSize)
              .exec(),
        ])

        return Paginated.getPaginated({
            items: items.map(i => new CommentViewModel(i)),
            count: totalCount,
            size: queryParams.pageSize,
            page: queryParams.pageNumber,
        })
    }

    async getCommentByID (commentID: string): Promise<CommentViewModel> {
        const comment = await this.commentModel.findById(commentID).exec()
        return new CommentViewModel(comment)
    }

}
