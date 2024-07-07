import { Book } from 'src/book/entities/book.entity';
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Role } from '../types/userRole.type';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  rePassword: string;

  @Column({ type: 'varchar', unique:true, nullable: false })
  nickname: string;

  @Column({ type: 'int', default: 1000000 })
  wallet: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar',nullable: false })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Book, (book) => book.user)
  book: Book[];
}