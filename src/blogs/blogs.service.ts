import {Inject, Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {CreateBlogDto} from "./dto/createBlog";
import {Blog} from "./types/createBlog";

@Injectable()
export class BlogsService {
    constructor(
        @Inject('BLOG_MODEL')
        private blogModel: Model<Blog>,
    ) {}

    async createBlog (createCatDto: CreateBlogDto): Promise<Blog>{
        const createdBlog = new this.blogModel(createCatDto)
        return createdBlog.save()
    }
}
