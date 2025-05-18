import { PipeTransform, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import {BlogsQueryRepository} from "../modules/blogs/blogs.query-repository";
import {PostsQueryRepository} from "../modules/posts/posts.query-repository";


@Injectable()
export class ValidateBlogIdPipe implements PipeTransform<string> {
    constructor(private readonly blogsQueryRepository: BlogsQueryRepository) {}

    async transform(value: string): Promise<string> {

        if (!value) throw new NotFoundException(` Blog ID is not exist`)

        const blog = await this.blogsQueryRepository.getBlogByID(value)
        if (!blog) {
            console.log(`Blog with ID ${value} not found`)
            throw new NotFoundException(`Blog with ID ${value} not found`)
        }

        return value
    }
}

@Injectable()
export class ValidatePostIdPipe implements PipeTransform<string> {
    constructor(private readonly postsQueryRepository: PostsQueryRepository) {}

    async transform(value: string): Promise<string> {

        if (!value) throw new NotFoundException(` Post ID is not exist`)

        const post = await this.postsQueryRepository.getPostByID(value)
        if (!post) {
            console.log(`Post with ID ${value} not found`)
            throw new NotFoundException(`Post with ID ${value} not found`)
        }

        return value
    }
}

