import {Inject, Injectable} from '@nestjs/common';
import { Model } from "mongoose";
import {CommentDBModel} from "./types/getComment";

@Injectable()
export class CommentsRepository {
    constructor(
        @Inject('COMMENT_MODEL')
        private commentModel: Model<CommentDBModel>,
    ) {}

}
