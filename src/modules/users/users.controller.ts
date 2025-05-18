import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query} from '@nestjs/common';
import {FindAllUsersDto} from "./queryDto/findAllUsersDto";
import {UsersQueryRepository} from "./users.query-repository";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUser";
import {ValidateUserIdPipe} from "../../pipes/parse-mongo-id.pipe";

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
    @HttpCode(204)
    async deletePost(@Param('id', ValidateUserIdPipe) userID: string) {
        return this.usersService.deleteUser(userID)
    }
}
