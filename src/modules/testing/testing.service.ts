import {TestingRepository} from "./testing.repository";
import {Inject} from "@nestjs/common";
import {Post} from "../posts/types/createPost";

export class TestingService {
    constructor(
        @Inject() private readonly testingRepository: TestingRepository,
    ) {}
    async deleteAllBlogs(): Promise<Post | null>{
        return this.testingRepository.deleteAllBlogs()
    }

    async deleteAllPosts(): Promise<Post | null>{
        return this.testingRepository.deleteAllPosts()
    }

    async deleteAllComments (): Promise<Post | null>{
        return this.testingRepository.deleteAllComments()
    }
}
