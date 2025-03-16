import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {BlogDBModel} from "../blogs/types/getBlog";
import {CommentDBModel} from "../comments/types/getComment";
import {PostDBModel} from "../posts/types/getPost";

@Injectable()
export class TestingRepository {
    constructor(
        @Inject('BLOG_MODEL') private blogModel: Model<BlogDBModel>,
        @Inject('POST_MODEL') private postModel: Model<PostDBModel>,
        @Inject('COMMENT_MODEL') private commentModel: Model<CommentDBModel>,
    ) {}

    async deleteAllBlogs(): Promise<any> {
        return this.blogModel.deleteMany([])
    }

    async deleteAllPosts(): Promise<any>{
        return this.postModel.deleteMany([])
    }

    async deleteAllComments (): Promise<any> {
        return this.commentModel.deleteMany([])
    }

}
