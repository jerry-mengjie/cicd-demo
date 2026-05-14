import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.nickname = createUserDto.nickname;
    return this.user.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const keyWord = query.keyWord || '';
    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const data = await this.user.find({
      where: {
        name: Like(`%${keyWord}%`),
      },
      order: {
        id: 'ASC', //DESC
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    console.log('MYSQL_PORT', this.configService.get('MYSQL_PORT'));
    const data = await this.user.find({ where: { id } });
    return data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
