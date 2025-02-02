import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {CreateBlogDto} from "./dto/createBlog";
import {FindAllBlogsDto} from "./queryDto/findAllblogsDto";
import {BlogsQueryRepository} from "./blogs.query-repository";

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly blogsService: BlogsService,
        private readonly blogsQueryRepository: BlogsQueryRepository
    ) {
    }
    @Get()
    async getBlogs(@Query() query: FindAllBlogsDto ): Promise<any> {
        return this.blogsQueryRepository.getBlogs(query)
    }

    @Post()
    async createBlog(@Body() dto: CreateBlogDto) {
        return this.blogsService.createBlog(dto)
    }

    @Delete(':id')
    async deleteBlog(@Param('id') blogID: string) {
        console.log(blogID)
         return this.blogsService.deleteBlog(blogID)
    }

}
