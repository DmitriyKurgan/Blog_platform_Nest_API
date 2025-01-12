import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// {
//   "pagesCount": 0,
//     "page": 0,
//     "pageSize": 0,
//     "totalCount": 0,
//     "items": [
//   {
//     "id": "string",
//     "name": "string",
//     "description": "string",
//     "websiteUrl": "string",
//     "createdAt": "2025-01-12T20:29:04.953Z",
//     "isMembership": true
//   }
// ]
// }