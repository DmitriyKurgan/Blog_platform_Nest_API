import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {FindAllPostsDto} from "./queryDto/findAllPostsDto";
import {PostsQueryRepository} from "./posts.query-repository";
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dto/createPost";
import {UpdatePostDto} from "./dto/updatePost";
import {CommentsQueryRepository} from "../comments/comments.query-repository";
import {FindAllCommentsDto} from "../comments/queryDto/findAllCommentsDto";
import {BlogsQueryRepository} from "../blogs/blogs.query-repository";

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly postsQueryRepository: PostsQueryRepository,
        private readonly blogsQueryRepository: BlogsQueryRepository,
        private readonly commentsQueryRepository: CommentsQueryRepository
    ) {}

    @Get()
    async getPosts(@Query() query: FindAllPostsDto): Promise<any> {
        return this.postsQueryRepository.getPosts(query)
    }

    @Get(':id')
    async getPostByID(@Param('id') postID: string): Promise<any> {
        return this.postsQueryRepository.getPostByID(postID)
    }

    @Get(':id/comments')
    async getCommentsByPostID(
        @Param('id') postID: string,
        @Body('id') dto: FindAllCommentsDto,
    ): Promise<any> {
        return this.commentsQueryRepository.getComments(dto)
    }

    @Post()
    async createPost(@Body() dto: CreatePostDto) {

        const blog = await this.blogsQueryRepository.getBlogByID(dto.blogId)

        if (blog) throw new BadRequestException('Blog ID is required')

        return this.postsService.createPost(dto)
    }

    @Put(':id')
    async updatePost(
        @Body() updatePostDto: UpdatePostDto,
        @Param('id') postID: string,
    ) {
        return this.postsService.updatePost(postID, updatePostDto)
    }


    @Delete(':id')
    async deletePost(@Param('id') postID: string) {
        return this.postsService.deletePost(postID)
    }
}
