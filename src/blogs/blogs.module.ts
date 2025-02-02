import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import {blogsProviders} from "../schemas/blogs.providers";
import {DatabaseModule} from "../database/database.module";
import {BlogsRepository} from "./blogs.repository";
import {BlogsQueryRepository} from "./blogs.query-repository";

@Module({
  imports:[DatabaseModule],
  controllers: [BlogsController],
  providers: [
      BlogsService,
      BlogsRepository,
      BlogsQueryRepository,
      ...blogsProviders
  ],
})
export class BlogsModule {}
