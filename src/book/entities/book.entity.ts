import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Show } from '../../show/entities/show.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'book',
})
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.book)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Show, (show) => show.book, {
    onDelete: 'CASCADE',
  })
  show: Show;

  @Column({ type: 'bigint', name: 'show_id' })
  show_id: number;

  @Column({ type: 'varchar', name: 'status', default: 'Reserved'})
  status: string;
}