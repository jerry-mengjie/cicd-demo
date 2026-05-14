import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
  //自增列
  @PrimaryGeneratedColumn()
  id: number;
  //普通列
  @Column()
  title: string;
  @Column()
  details: string;
}
