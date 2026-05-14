import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  //自增列
  @PrimaryGeneratedColumn()
  id: number;
  //普通列
  @Column()
  name: string;
  @Column()
  nickname: string;
}
