import {TestingRepository} from "./testing.repository";
import {Inject} from "@nestjs/common";
import {Post} from "../posts/types/createPost";
import {User} from "../users/types/createUser";

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

    async deleteAllUsers (): Promise<User | null>{
        return this.testingRepository.deleteAllUsers()
    }
}
