import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {FindAllPostsDto} from "./queryDto/findAllPostsDto";
import {PostsQueryRepository} from "./posts.query-repository";
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dto/createPost";
import {UpdatePostDto} from "./dto/updatePost";

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly postsQueryRepository: PostsQueryRepository
    ) {}

    @Get()
    async getPosts(@Query() query: FindAllPostsDto): Promise<any> {
        return this.postsQueryRepository.getPosts(query)
    }

    @Get(':id')
    async getPostByID(@Param('id') postID: string): Promise<any> {
        return this.postsQueryRepository.getPostByID(postID)
    }

    @Post()
    async createPost(@Body() dto: CreatePostDto) {
        return this.postsService.createPost(dto)
    }

    @Put(':id')
    async updatePost(
        @Body() updatePostDto: UpdatePostDto,
        @Param('id') postID: string,
    ) {
        return this.postsService.updatePost(postID, updatePostDto)
    }


    @Delete(':id')
    async deletePost(@Param('id') postID: string) {
        return this.postsService.deletePost(postID)
    }
}
