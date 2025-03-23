import {UsersRepository} from "./users.repository";
import {Inject} from "@nestjs/common";
import {CreateUserDto} from "./dto/createUser";
import {User} from "./types/createUser";
import {UsersQueryRepository} from "./users.query-repository";

export class UsersService {
    constructor(
        @Inject() private readonly usersRepository: UsersRepository,
        @Inject() private readonly usersQueryRepository: UsersQueryRepository
    ) {}

    async createUser (createUserDto: CreateUserDto): Promise<User | null>{

        const newUser = {
            ...createUserDto,
            createdAt: new Date().toISOString(),
        }

        return this.usersRepository.createUser(newUser)
    }

    async deleteUser (userID: string): Promise<User | null>{
        return this.usersRepository.deleteUser(userID)
    }
}
