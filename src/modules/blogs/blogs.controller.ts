import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {BlogsService} from './blogs.service';
import {CreateBlogDto} from "./dto/createBlog";
import {FindAllBlogsDto} from "./queryDto/findAllblogsDto";
import {BlogsQueryRepository} from "./blogs.query-repository";
import {UpdateBlogDto} from "./dto/updateBlog";

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
