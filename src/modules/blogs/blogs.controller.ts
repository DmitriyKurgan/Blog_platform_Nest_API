import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {CreateBlogDto} from "./dto/createBlog";
import {FindAllBlogsDto} from "./queryDto/findAllblogsDto";
import {BlogsQueryRepository} from "./blogs.query-repository";
import {UpdateBlogDto} from "./dto/updateBlog";
import {CreatePostDto} from "../posts/dto/createPost";
import {BlogViewModel} from "./dto/getBlog";
import {ValidateBlogIdPipe} from "../../pipes/parse-mongo-id.pipe";
import {Paginated} from "../../common/paginated";
import {PostsQueryRepository} from "../posts/posts.query-repository";
import {FindAllPostsDto} from "../posts/queryDto/findAllPostsDto";
import {logAndThrowError, LoggerService} from "../logger/logger-service";

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly blogsService: BlogsService,
        private readonly loggerService: LoggerService,
        private readonly blogsQueryRepository: BlogsQueryRepository,
        private readonly postsQueryRepository: PostsQueryRepository
    ) {}

    @Get()
    async getBlogs(@Query() query: FindAllBlogsDto): Promise<Paginated<BlogViewModel[]>> {
        return this.blogsQueryRepository.getBlogs(query)
    }

    @Get(':id')
    async getBlogByID(
        @Param('id', ValidateBlogIdPipe) blogID: string
    ): Promise<BlogViewModel | null> {
        return this.blogsQueryRepository.getBlogByID(blogID)
    }

    @Get(':id/posts')
    async getAllPostsByBlogID(
        @Param('id', ValidateBlogIdPipe) blogID: string,
        @Query() query: FindAllPostsDto
    ): Promise<any> {

        try {
            return this.postsQueryRepository.getPosts(query, blogID)
        } catch (error) {
            logAndThrowError(error, this.loggerService)
        }

    }

    @Post()
    async createBlog(@Body() dto: CreateBlogDto) {
        return this.blogsService.createBlog(dto)
    }

    @Post(':id/posts')
    async createPostForBlogByID(
        @Param('id', ValidateBlogIdPipe) blogID: string,
        @Body() dto: CreatePostDto,
    ) {
        return this.blogsService.createPostForBlogByID(blogID, dto)
    }

    @Put(':id')
    @HttpCode(204)
    async updateBlog(
        @Body() updateBlogDto: UpdateBlogDto,
        @Param('id', ValidateBlogIdPipe) blogID: string,
    ) {
        return this.blogsService.updateBlog(blogID, updateBlogDto)
    }


    @Delete(':id')
    @HttpCode(204)
    async deleteBlog(@Param('id', ValidateBlogIdPipe) blogID: string) {
        return this.blogsService.deleteBlog(blogID)
    }
}
