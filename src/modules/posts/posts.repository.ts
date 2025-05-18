import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {PostDBModel} from "./types/getPost";
import {Post} from "./types/createPost";
import {UpdatePostDto} from "./dto/updatePost";
import {PostViewModel} from "./dto/getPost";

@Injectable()
export class PostsRepository {
    constructor(
        @Inject('POST_MODEL')
        private postModel: Model<PostDBModel>,
    ) {}

    async createPost (postData: Partial<Post>): Promise<PostViewModel>{
        const createdPost = new this.postModel(postData)
        console.log('createdPost', createdPost)
        await createdPost.save()

       return new PostViewModel(createdPost)
    }

    async updatePost (blogID: string, updateData: UpdatePostDto): Promise<Post | null>{

        const updatedPost = await this.postModel.findByIdAndUpdate(
            blogID,
            updateData,
            { new: true, runValidators: true }
        )

        return updatedPost
    }

    async deletePost (postID: string): Promise<Post | null>{
        return this.postModel.findByIdAndDelete(postID)
    }
}
