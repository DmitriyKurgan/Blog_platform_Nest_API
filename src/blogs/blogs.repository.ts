import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {Blog} from "./types/createBlog";
import {BlogDBModel} from "./types/getBlog";

@Injectable()
export class BlogsRepository {
    constructor(
        @Inject('BLOG_MODEL')
        private blogModel: Model<BlogDBModel>,
    ) {}

    async createBlog (blogData: Partial<Blog>): Promise<Blog>{
        const createdBlog = new this.blogModel(blogData)
        return createdBlog.save()
    }

    async deleteBlog (blogID: string): Promise<Blog>{
        return this.blogModel.findByIdAndDelete(blogID)
    }
}
