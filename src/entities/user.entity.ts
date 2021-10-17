import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from './userType.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userTypeId: number;

  @OneToOne(() => UserType)
  @JoinColumn()
  userType: UserType;

  @Column({ default: true })
  active: boolean;
}
