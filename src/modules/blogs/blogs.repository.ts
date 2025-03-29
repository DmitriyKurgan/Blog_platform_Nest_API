import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {Blog} from "./types/createBlog";
import {BlogDBModel} from "./types/getBlog";
import {UpdateBlogDto} from "./dto/updateBlog";
import {Post} from "../posts/types/createPost";
import {PostDBModel} from "../posts/types/getPost";
import {BlogViewModel} from "./dto/getBlog";

@Injectable()
export class BlogsRepository {
    constructor(
        @Inject('BLOG_MODEL') private blogModel: Model<BlogDBModel>,
        @Inject('POST_MODEL') private postModel: Model<PostDBModel>,
    ) {}

    async createBlog (blogData: Partial<Blog>): Promise<BlogViewModel>{

        const createdBlog = new this.blogModel(blogData)
        await createdBlog.save()

        return new BlogViewModel(createdBlog)
    }

    async createPostForBlogByID (postData: Partial<Post>): Promise<Post>{
        const createdPostForBlogByID = new this.postModel(postData)
        return createdPostForBlogByID.save()
    }

    async updateBlog (blogID: string, updateData: UpdateBlogDto): Promise<Blog | null>{

        const updatedBlog = await this.blogModel.findByIdAndUpdate(
            blogID,
            updateData,
            { new: true, runValidators: true }
        )

        return updatedBlog
    }

    async deleteBlog (blogID: string): Promise<Blog | null>{
        return this.blogModel.findByIdAndDelete(blogID)
    }
}
