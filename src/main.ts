import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

const PORT = process.env.PORT || 5000
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

bootstrap()
