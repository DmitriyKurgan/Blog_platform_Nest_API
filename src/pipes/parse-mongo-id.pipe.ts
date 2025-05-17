import { PipeTransform, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import {BlogsQueryRepository} from "../modules/blogs/blogs.query-repository";


@Injectable()
export class ValidateBlogIdPipe implements PipeTransform<string> {
    constructor(private readonly blogsQueryRepository: BlogsQueryRepository) {}

    async transform(value: string): Promise<string> {

        // if (!Types.ObjectId.isValid(value)) {
        //     throw new BadRequestException(`Invalid MongoDB ID: ${value}`)
        // }

        // const blog = await this.blogsQueryRepository.getBlogByID(value)
        // if (!blog) {
        //     console.log(`Blog with ID ${value} not found`)
        //     throw new NotFoundException(`Blog with ID ${value} not found`)
        // }

        return value
    }
}
