import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {CreateBlogDto} from "./dto/createBlog";
import {FindAllBlogsDto} from "./queryDto/findAllblogsDto";
import {BlogsQueryRepository} from "./blogs.query-repository";
import {UpdateBlogDto} from "./dto/updateBlog";
import {CreatePostDto} from "../posts/dto/createPost";
import {BlogViewModel} from "./dto/getBlog";
import {ParseMongoIdPipe} from "../../pipes/parse-mongo-id.pipe";

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly blogsService: BlogsService,
        private readonly blogsQueryRepository: BlogsQueryRepository
    ) {}

    @Get()
    async getBlogs(@Query() query: FindAllBlogsDto): Promise<any> {
        return this.blogsQueryRepository.getBlogs(query)
    }

    @Get(':id')
    async getBlogByID(@Param('id') blogID: string): Promise<BlogViewModel | null> {
        return this.blogsQueryRepository.getBlogByID(blogID)
    }

    @Post()
    async createBlog(@Body() dto: CreateBlogDto) {
        return this.blogsService.createBlog(dto)
    }

    @Post(':id/posts')
    async createPostForBlogByID(
        @Param('id', new ParseMongoIdPipe()) blogID: string,
        @Body() dto: CreatePostDto,
    ) {
        console.log('blogID', blogID)
        return this.blogsService.createPostForBlogByID(blogID, dto)
    }

    @Put(':id')
    async updateBlog(
        @Body() updateBlogDto: UpdateBlogDto,
        @Param('id') blogID: string,
    ) {
        return this.blogsService.updateBlog(blogID, updateBlogDto)
    }


    @Delete(':id')
    async deleteBlog(@Param('id') blogID: string) {
        return this.blogsService.deleteBlog(blogID)
    }
}
