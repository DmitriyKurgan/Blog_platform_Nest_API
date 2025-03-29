import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './modules/blogs/blogs.module';
import {PostsModule} from "./modules/posts/posts.module";
import {CommentsModule} from "./modules/comments/comments.module";
import {TestingModule} from "./modules/testing/testing.module";

@Module({
  imports: [
    BlogsModule,
    PostsModule,
    CommentsModule,
    TestingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
