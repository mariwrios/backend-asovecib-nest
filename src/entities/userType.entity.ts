import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
