import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

type NewsRecord = {
  id: number;
  title: string;
  details: string;
};
@Injectable()
export class NewsService {
  private readonly newsFilePath = join(process.cwd(), 'data', 'news.json');

  private async readNews(): Promise<NewsRecord[]> {
    try {
      const fileContent = await readFile(this.newsFilePath, 'utf-8');
      return JSON.parse(fileContent) as NewsRecord[];
    } catch (error) {
      // On first run the file may not exist; treat as empty data source.
      return [];
    }
  }

  private async saveNews(news: NewsRecord[]) {
    await mkdir(dirname(this.newsFilePath), { recursive: true });
    await writeFile(this.newsFilePath, JSON.stringify(news, null, 2), 'utf-8');
  }

  async create(createNewsDto: CreateNewsDto) {
    const news = await this.readNews();
    const nextId = news.length ? Math.max(...news.map((item) => item.id)) + 1 : 1;
    const data: NewsRecord = {
      id: nextId,
      title: createNewsDto.title,
      details: createNewsDto.details,
    };
    news.push(data);
    await this.saveNews(news);
    return data;
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const keyWord = query.keyWord || '';
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const news = await this.readNews();
    const filtered = news.filter((item) => item.title.includes(keyWord));
    const sorted = filtered.sort((a, b) => a.id - b.id);
    const data = sorted.slice((page - 1) * pageSize, page * pageSize);
    const total = filtered.length;
    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    const news = await this.readNews();
    return news.filter((item) => item.id === id);
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.readNews();
    const targetIndex = news.findIndex((item) => item.id === id);
    if (targetIndex === -1) {
      return { affected: 0 };
    }
    news[targetIndex] = { ...news[targetIndex], ...updateNewsDto, id };
    await this.saveNews(news);
    return { affected: 1 };
  }

  async remove(id: number) {
    const news = await this.readNews();
    const nextNews = news.filter((item) => item.id !== id);
    if (nextNews.length === news.length) {
      return { affected: 0 };
    }
    await this.saveNews(nextNews);
    return { affected: 1 };
  }
}
