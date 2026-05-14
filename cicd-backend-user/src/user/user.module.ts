import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.service';
import { UserController } from './user.controller';
@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
