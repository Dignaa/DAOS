import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { PostType, Instrument } from './enum/post.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PostType })
  type: PostType;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: Instrument })
  instrument: Instrument;

  @Column()
  userId: string;
}
