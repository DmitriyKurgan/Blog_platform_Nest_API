
import {FindAllCommentsDto} from "./queryDto/findAllCommentsDto";
import {CommentsQueryRepository} from "./comments.query-repository";
import {CommentsService} from "./comments.service";
import {Controller, Get, Param, Query} from "@nestjs/common";

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        private readonly commentsQueryRepository: CommentsQueryRepository
    ) {}

    @Get()
    async getComments(@Query() query: FindAllCommentsDto): Promise<any> {
        return this.commentsQueryRepository.getComments(query)
    }

    @Get(':id')
    async getCommentByID(@Param('id') commentID: string): Promise<any> {
        return this.commentsService.getCommentByID(commentID)
    }
}
