import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  email: string;

  @Column()
  fullName: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoggedIn?: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
