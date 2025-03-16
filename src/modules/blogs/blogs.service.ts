import {CreateBlogDto} from "./dto/createBlog";
import {Blog} from "./types/createBlog";
import {BlogsRepository} from "./blogs.repository";
import {Inject} from "@nestjs/common";
import {UpdateBlogDto} from "./dto/updateBlog";
import {BlogsQueryRepository} from "./blogs.query-repository";
import {CreatePostDto} from "../posts/dto/createPost";
import {Post} from "../posts/types/createPost";

export class BlogsService {
    constructor(
        @Inject() private readonly blogsRepository: BlogsRepository,
        @Inject() private readonly blogsQueryRepository: BlogsQueryRepository
    ) {}

    async createBlog (createBlogDto: CreateBlogDto): Promise<Blog>{
        const newBlog = {
            ...createBlogDto,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }

        return this.blogsRepository.createBlog(newBlog)
    }

    async createPostForBlogByID (blogID: string, createPostDto: CreatePostDto): Promise<Post>{

        const currentBlog = await this.blogsQueryRepository.getBlogByID(blogID)

        const newPost = {
            ...createPostDto,
            blogName: currentBlog.name,
            createdAt: new Date().toISOString(),
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: []
            }
        }

        return this.blogsRepository.createPostForBlogByID(newPost)
    }

    async updateBlog (blogID: string, updateBlogDto: UpdateBlogDto): Promise<Blog>{
        return this.blogsRepository.updateBlog(blogID, updateBlogDto)
    }

    async deleteBlog (blogID: string): Promise<Blog>{
        return this.blogsRepository.deleteBlog(blogID)
    }
}
