import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {UsersRepository} from "./users.repository";
import {UsersQueryRepository} from "./users.query-repository";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {usersProviders} from "../../schemas/users.providers";

@Module({
  imports:[DatabaseModule],
  controllers: [UsersController],
  providers: [
      UsersService,
      UsersRepository,
      UsersQueryRepository,
      ...usersProviders,
  ],
  exports: [UsersQueryRepository, ...usersProviders,]
})

export class UsersModule {}
