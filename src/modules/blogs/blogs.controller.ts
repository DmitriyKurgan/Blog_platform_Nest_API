import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {CreateBlogDto} from "./dto/createBlog";
import {FindAllBlogsDto} from "./queryDto/findAllblogsDto";
import {BlogsQueryRepository} from "./blogs.query-repository";
import {UpdateBlogDto} from "./dto/updateBlog";
import {CreatePostDto} from "../posts/dto/createPost";

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
    async getBlogByID(@Param('id') blogID: string): Promise<any> {
        return this.blogsQueryRepository.getBlogByID(blogID)
    }

    @Post()
    async createBlog(@Body() dto: CreateBlogDto) {
        return this.blogsService.createBlog(dto)
    }

    @Post()
    async createPostForBlogByID(
        @Param('id/posts') blogID: string,
        @Body() dto: CreatePostDto,
    ) {
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
