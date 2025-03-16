import {BlogDBModel} from "../../blogs/types/getBlog";
import {CommentDBModel} from "../types/getComment";

export class CommentViewModel {
    id: string
    content: string

    commentatorInfo: {
        userId: string,
        userLogin: string
    }

    createdAt: string

    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string
    }

    constructor(comment: CommentDBModel) {
        this.id = comment._id.toString()
        this.commentatorInfo = {...comment.commentatorInfo}
        this.content = comment.content
        this.createdAt = comment.createdAt
        this.likesInfo = {...comment.likesInfo}
    }

}


