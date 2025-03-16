import {Likes, PostDBModel} from "../types/getPost";

export class PostViewModel {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string

    blogName: string
    createdAt: Date
    extendedLikesInfo: {
        likesCount: number
        dislikesCount: number
        myStatus: string
        newestLikes: Likes[]
    }

    constructor(post: PostDBModel) {
        this.id = post._id.toString()
        this.title = post.title
        this.shortDescription = post.shortDescription
        this.content = post.content
        this.blogId = post.blogId
        this.blogName = post.blogName
        this.createdAt = post.createdAt
        this.extendedLikesInfo = {
            ...post.extendedLikesInfo,
            newestLikes: [...post.extendedLikesInfo.newestLikes]
     }
   }
}


