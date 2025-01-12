import {Body, Controller, Post} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import {CreateBlogDto} from "./dto/createBlog";

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
   async createBlog(@Body() dto: CreateBlogDto) {
        return this.blogsService.createBlog(dto)
    }
}
