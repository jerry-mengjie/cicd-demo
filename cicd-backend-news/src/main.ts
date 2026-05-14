import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api-news');
  const options = new DocumentBuilder()
    .setTitle('news模块接口文档')
    .setDescription('描述。。。')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger/news', app, document);
  await app.listen(8092);
}
bootstrap();
