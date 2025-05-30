import {forwardRef, Module} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import {blogsProviders} from "../../schemas/blogs.providers";
import {DatabaseModule} from "../database/database.module";
import {BlogsRepository} from "./blogs.repository";
import {BlogsQueryRepository} from "./blogs.query-repository";
import {PostsModule} from "../posts/posts.module";
import {LoggerService} from "../logger/logger-service";

@Module({
  imports:[DatabaseModule, forwardRef(() => PostsModule)],
  controllers: [BlogsController],
  providers: [
      LoggerService,
      BlogsService,
      BlogsRepository,
      BlogsQueryRepository,
      ...blogsProviders
  ],
    exports: [BlogsQueryRepository, ...blogsProviders]
})

export class BlogsModule {}
