import {CreateBlogDto} from "./dto/createBlog";
import {Blog} from "./types/createBlog";
import {BlogsRepository} from "./blogs.repository";
import {Inject} from "@nestjs/common";
import {UpdateBlogDto} from "./dto/updateBlog";

export class BlogsService {
    constructor(
        @Inject() private readonly blogsRepository: BlogsRepository
    ) {}

    async createBlog (createBlogDto: CreateBlogDto): Promise<Blog>{
        const newBlog = {
            ...createBlogDto,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }

        return this.blogsRepository.createBlog(newBlog)
    }

    async updateBlog (blogID: string, updateBlogDto: UpdateBlogDto): Promise<Blog>{
        return this.blogsRepository.updateBlog(blogID, updateBlogDto)
    }

    async deleteBlog (blogID: string): Promise<Blog>{
        return this.blogsRepository.deleteBlog(blogID)
    }
}
