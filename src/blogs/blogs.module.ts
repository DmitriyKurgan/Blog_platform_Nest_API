import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import {blogsProviders} from "../schemas/blogs.providers";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports:[DatabaseModule],
  controllers: [BlogsController],
  providers: [
      BlogsService,
      ...blogsProviders
  ],
})
export class BlogsModule {}
