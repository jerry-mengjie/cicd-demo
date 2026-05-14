import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user微服务')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/micro')
  @ApiOperation({ summary: 'MessagePattern方式调用user微服务列表接口' })
  findMicro() {
    return this.userService.findMicro();
  }

  @Get('/axios')
  @ApiOperation({ summary: 'axios方式调用user微服务列表接口' })
  findAxios(
    @Query() query: { keyWord: string; page: number; pageSize: number },
  ) {
    return this.userService.findAxios(query);
  }
}
