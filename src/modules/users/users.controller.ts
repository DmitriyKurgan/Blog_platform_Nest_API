import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {FindAllUsersDto} from "./queryDto/findAllUsersDto";
import {UsersQueryRepository} from "./users.query-repository";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUser";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly usersQueryRepository: UsersQueryRepository,
    ) {}

    @Get()
    async getUsers(@Query() query: FindAllUsersDto): Promise<any> {
        return this.usersQueryRepository.getUsers(query)
    }

    @Post()
    async createPost(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto)
    }


    @Delete(':id')
    async deletePost(@Param('id') userID: string) {
        return this.usersService.deleteUser(userID)
    }
}
