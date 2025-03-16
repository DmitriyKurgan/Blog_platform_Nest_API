import {PostsRepository} from "./posts.repository";
import {Inject} from "@nestjs/common";
import {CreatePostDto} from "./dto/createPost";
import {Post} from "./types/createPost";
import {UpdatePostDto} from "./dto/updatePost";
import {BlogsQueryRepository} from "../blogs/blogs.query-repository";

export class PostsService {
    constructor(
        @Inject() private readonly postsRepository: PostsRepository,
        @Inject() private readonly blogsQueryRepository: BlogsQueryRepository
    ) {}

    async createPost (createPostDto: CreatePostDto): Promise<Post | null>{

        const { blogId } = createPostDto

        const currentBlog = await this.blogsQueryRepository.getBlogByID(blogId)

        if (!currentBlog) return null

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

        return this.postsRepository.createPost(newPost)
    }

    async updatePost (postID: string, updatePostDto: UpdatePostDto): Promise<Post | null>{
        return this.postsRepository.updatePost(postID, updatePostDto)
    }

    async deletePost (postID: string): Promise<Post | null>{
        return this.postsRepository.deletePost(postID)
    }
}
