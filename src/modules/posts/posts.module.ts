import {forwardRef, Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {PostsRepository} from "./posts.repository";
import {PostsQueryRepository} from "./posts.query-repository";
import {PostsService} from "./posts.service";
import {PostsController} from "./posts.controller";
import {postsProviders} from "../../schemas/posts.providers";
import {BlogsModule} from "../blogs/blogs.module";

@Module({
  imports:[DatabaseModule, forwardRef(() => BlogsModule)],
  controllers: [PostsController],
  providers: [
      PostsService,
      PostsRepository,
      PostsQueryRepository,
      ...postsProviders,
  ],
  exports: [PostsQueryRepository, ...postsProviders,]
})

export class PostsModule {}
