import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from '@nestjs/common';
import {FindAllPostsDto} from "./queryDto/findAllPostsDto";
import {PostsQueryRepository} from "./posts.query-repository";
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dto/createPost";
import {UpdatePostDto} from "./dto/updatePost";
import {CommentsQueryRepository} from "../comments/comments.query-repository";
import {FindAllCommentsDto} from "../comments/queryDto/findAllCommentsDto";
import {BlogsQueryRepository} from "../blogs/blogs.query-repository";
import {PostViewModel} from "./dto/getPost";
import {ValidatePostIdPipe} from "../../pipes/parse-mongo-id.pipe";

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
    async getPostByID(@Param('id', ValidatePostIdPipe) postID: string): Promise<PostViewModel | null> {
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
    async createPost(@Body() dto: CreatePostDto): Promise<PostViewModel | null> {
        console.log('CreatePostDto', dto)
        if (!dto.blogId) throw new BadRequestException('Blog ID is required')
        if (dto.blogId.length !== 24) throw new BadRequestException('Blog ID is not valid')
        const blog = await this.blogsQueryRepository.getBlogByID(dto.blogId)
        console.log('blog', blog)
        if (!blog) throw new BadRequestException('Blog ID is required')

        return this.postsService.createPost(dto)
    }

    @Put(':id')
    @HttpCode(204)
    async updatePost(
        @Body() updatePostDto: UpdatePostDto,
        @Param('id', ValidatePostIdPipe) postID: string,
    ) {
        return this.postsService.updatePost(postID, updatePostDto)
    }


    @Delete(':id')
    @HttpCode(204)
    async deletePost(@Param('id', ValidatePostIdPipe) postID: string) {
        return this.postsService.deletePost(postID)
    }
}
