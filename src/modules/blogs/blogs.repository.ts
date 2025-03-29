import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {Blog} from "./types/createBlog";
import {BlogDBModel} from "./types/getBlog";
import {UpdateBlogDto} from "./dto/updateBlog";
import {Post} from "../posts/types/createPost";
import {PostDBModel} from "../posts/types/getPost";
import {BlogViewModel} from "./dto/getBlog";
import {BlogsQueryRepository} from "./blogs.query-repository";
import {PostsQueryRepository} from "../posts/posts.query-repository";
import {PostViewModel} from "../posts/dto/getPost";

@Injectable()
export class BlogsRepository {
    constructor(
        @Inject('BLOG_MODEL') private blogModel: Model<BlogDBModel>,
        @Inject('POST_MODEL') private postModel: Model<PostDBModel>,
        private readonly blogsQueryRepository: BlogsQueryRepository,
        private readonly postsQueryRepository: PostsQueryRepository
    ) {}

    async createBlog (blogData: Partial<Blog>): Promise<BlogViewModel | null>{
        const createdBlog = await this.blogModel.create(blogData)
        return this.blogsQueryRepository.getBlogByID(createdBlog._id.toString())
    }

    async createPostForBlogByID (postData: Partial<Post>): Promise<PostViewModel | null>{
        const createdPostForBlogByID = await this.postModel.create(postData)
        return this.postsQueryRepository.getPostByID(createdPostForBlogByID._id.toString())
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
