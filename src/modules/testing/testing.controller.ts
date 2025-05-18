import {Controller, Delete, HttpCode} from '@nestjs/common';
import {TestingService} from "./testing.service";

@Controller('testing')
export class TestingController {
    constructor(
        private readonly testingService: TestingService,
    ) {}

    @Delete('all-data')
    @HttpCode(204)
    async deleteAllData() {
        await Promise.all([
            this.testingService.deleteAllBlogs(),
            this.testingService.deleteAllPosts(),
            this.testingService.deleteAllUsers(),
            this.testingService.deleteAllComments()
        ])

        return { message: 'All data deleted successfully' }
    }
}
