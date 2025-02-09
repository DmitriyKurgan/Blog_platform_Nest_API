import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {Blog} from "./types/createBlog";
import {BlogDBModel} from "./types/getBlog";
import {UpdateBlogDto} from "./dto/updateBlog";

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

    async updateBlog (blogID: string, updateData: UpdateBlogDto): Promise<Blog>{

        const updatedBlog = await this.blogModel.findByIdAndUpdate(
            blogID,
            updateData,
            { new: true, runValidators: true }
        )

        return updatedBlog
    }

    async deleteBlog (blogID: string): Promise<Blog>{
        return this.blogModel.findByIdAndDelete(blogID)
    }
}
