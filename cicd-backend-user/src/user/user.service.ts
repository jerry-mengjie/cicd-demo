import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

type UserRecord = {
  id: number;
  name: string;
  nickname: string;
};
@Injectable()
export class UserService {
  private readonly userFilePath = join(process.cwd(), 'data', 'users.json');

  private async readUsers(): Promise<UserRecord[]> {
    try {
      const fileContent = await readFile(this.userFilePath, 'utf-8');
      return JSON.parse(fileContent) as UserRecord[];
    } catch (error) {
      // On first run the file may not exist; treat as empty data source.
      return [];
    }
  }

  private async saveUsers(users: UserRecord[]) {
    await mkdir(dirname(this.userFilePath), { recursive: true });
    await writeFile(this.userFilePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  async create(createUserDto: CreateUserDto) {
    const users = await this.readUsers();
    const nextId = users.length ? Math.max(...users.map((item) => item.id)) + 1 : 1;
    const data: UserRecord = {
      id: nextId,
      name: createUserDto.name,
      nickname: createUserDto.nickname,
    };
    users.push(data);
    await this.saveUsers(users);
    return data;
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const keyWord = query.keyWord || '';
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const users = await this.readUsers();
    const filtered = users.filter((item) => item.name.includes(keyWord));
    const sorted = filtered.sort((a, b) => a.id - b.id);
    const data = sorted.slice((page - 1) * pageSize, page * pageSize);
    const total = filtered.length;
    return {
      data,
      total,
    };
  }

  async findOne(id: number) {
    const users = await this.readUsers();
    return users.filter((item) => item.id === id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const users = await this.readUsers();
    const targetIndex = users.findIndex((item) => item.id === id);
    if (targetIndex === -1) {
      return { affected: 0 };
    }
    users[targetIndex] = { ...users[targetIndex], ...updateUserDto, id };
    await this.saveUsers(users);
    return { affected: 1 };
  }

  async remove(id: number) {
    const users = await this.readUsers();
    const nextUsers = users.filter((item) => item.id !== id);
    if (nextUsers.length === users.length) {
      return { affected: 0 };
    }
    await this.saveUsers(nextUsers);
    return { affected: 1 };
  }
}
