import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {TestingRepository} from "./testing.repository";
import {TestingService} from "./testing.service";
import {TestingController} from "./testing.controller";
import {BlogsModule} from "../blogs/blogs.module";
import {PostsModule} from "../posts/posts.module";
import {CommentsModule} from "../comments/comments.module";


@Module({
  imports:[DatabaseModule, BlogsModule, PostsModule, CommentsModule],
  controllers: [TestingController],
  providers: [
      TestingService,
      TestingRepository,
  ],
})

export class TestingModule {}
