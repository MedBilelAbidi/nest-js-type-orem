
import  { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_profile' })
export class Profile {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  createdAt: Date;
  
  @Column()
  age: number

  @OneToOne(() => User, user => user.profile) // Define the inverse relationship
  user: User;
}
