import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: '姓名', example: 'jerry' })
  name: string;

  @ApiProperty({ description: '昵称', example: 'jerry' })
  nickname: string;
}
