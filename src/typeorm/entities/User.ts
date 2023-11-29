
import  { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';
import { UserCv } from './UserCv';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(()=> Profile, { nullable: true } )
  @JoinColumn({ name: 'profileId' })
  profile : Profile  

  @OneToMany(()=> UserCv, (userCv)=> userCv.user)
  @JoinColumn()
  userCvs : UserCv[];  
}
