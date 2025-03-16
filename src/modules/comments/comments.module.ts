import {forwardRef, Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {CommentsRepository} from "./comments.repository";
import {CommentsQueryRepository} from "./comments.query-repository";
import {CommentsService} from "./comments.service";
import {CommentsController} from "./comments.controller";
import {PostsModule} from "../posts/posts.module";
import {commentsProviders} from "../../schemas/comment.providers";

@Module({
  imports:[DatabaseModule,  forwardRef(() => PostsModule)],
  controllers: [CommentsController],
  providers: [
      CommentsService,
      CommentsRepository,
      CommentsQueryRepository,
      ...commentsProviders,
  ],
  exports: [CommentsQueryRepository, ...commentsProviders]
})

export class CommentsModule {}
