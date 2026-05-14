import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('news全局')
  @ApiOperation({ summary: 'news全局demo' })
  getHello(): string {
    return this.appService.getHello();
  }
}
