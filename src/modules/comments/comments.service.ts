import {Inject} from "@nestjs/common";
import {CommentsRepository} from "./comments.repository";
import {CommentsQueryRepository} from "./comments.query-repository";
import {CommentViewModel} from "./dto/getComment";

export class CommentsService {
    constructor(
        @Inject() private readonly commentsRepository: CommentsRepository,
        @Inject() private readonly commentsQueryRepository: CommentsQueryRepository
    ) {}


    async getCommentByID (commentID: string): Promise<CommentViewModel> {
        return this.commentsQueryRepository.getCommentByID(commentID)
    }
}
