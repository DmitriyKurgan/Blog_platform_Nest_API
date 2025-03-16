import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {PostDBModel} from "./types/getPost";
import {Post} from "./types/createPost";
import {UpdatePostDto} from "./dto/updatePost";

@Injectable()
export class PostsRepository {
    constructor(
        @Inject('POST_MODEL')
        private postModel: Model<PostDBModel>,
    ) {}

    async createPost (postData: Partial<Post>): Promise<Post>{
        const createdPost = new this.postModel(postData)
        return createdPost.save()
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
