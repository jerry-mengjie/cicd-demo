import { ApiProperty } from '@nestjs/swagger';
export class CreateNewsDto {
  @ApiProperty({ description: '标题', example: 'aa' })
  title: string;

  @ApiProperty({ description: '详情', example: 'aaaa' })
  details: string;
}
