import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Global()
@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ClientsModule.register([
      {
        name: 'Micro_Service_User',
        transport: Transport.TCP,
        options: {
          host:
            process.env.SCRIPT_ENV === 'local'
              ? 'localhost'
              : 'service-cicd-backend-user',
          port: 8093,
        },
      },
    ]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
