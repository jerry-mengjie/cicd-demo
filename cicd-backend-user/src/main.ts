import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      // host: 'localhost',
      port: 8093,
    },
  });
  await app.startAllMicroservices();
  app.setGlobalPrefix('/api-user');
  const options = new DocumentBuilder()
    .setTitle('user模块接口文档')
    .setDescription('描述。。。')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger/user', app, document);
  await app.listen(8091);
}
bootstrap();
