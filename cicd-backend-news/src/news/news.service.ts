import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly news: Repository<News>,
  ) {}

  create(createNewsDto: CreateNewsDto) {
    const data = new News();
    data.title = createNewsDto.title;
    data.details = createNewsDto.details;
    return this.news.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const keyWord = query.keyWord || '';
    const page = query.page || 1;
    const pageSize = query.pageSize || 10;
    const data = await this.news.find({
      where: {
        title: Like(`%${keyWord}%`),
      },
      order: {
        id: 'ASC', //details
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await this.news.count({
      where: {
        title: Like(`%${keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    const data = await this.news.find({ where: { id } });
    return data;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return this.news.update(id, updateNewsDto);
  }

  remove(id: number) {
    return this.news.delete(id);
  }
}
