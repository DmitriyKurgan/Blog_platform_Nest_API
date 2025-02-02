import {CreateBlogDto} from "./dto/createBlog";
import {Blog} from "./types/createBlog";
import {BlogsRepository} from "./blogs.repository";
import {Inject} from "@nestjs/common";

export class BlogsService {
    constructor(
        @Inject() private readonly blogsRepository: BlogsRepository
    ){
    }

    async createBlog (createBlogDto: CreateBlogDto): Promise<Blog>{
        const newBlog = {
            ...createBlogDto,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        return this.blogsRepository.createBlog(newBlog)
    }

    async deleteBlog (blogID: string): Promise<Blog>{
        return this.blogsRepository.deleteBlog(blogID)
    }
}
