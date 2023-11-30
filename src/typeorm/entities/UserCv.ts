import  { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { EducationDegree } from './Education';
import { Experience } from './Experience';

@Entity({ name: 'user_cv' })
export class UserCv {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column()
  name: string;

  @Column()
  addresse: string;

  @Column()
  tel: string;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  bio: string;

  @Column()
  skills: string;

  @Column()
  certif: string;

  @Column()
  language: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn ()
  updatedAt: Date;

  @ManyToOne(()=> User , (user)=> user.userCvs)
  user: User

  @OneToMany(()=> EducationDegree, (degree)=> degree.userCV ,  { cascade: true, eager: true} )
  education : EducationDegree[];  

  @OneToMany(()=> Experience, (degree)=> degree.userCV ,  { cascade: true, eager: true} )
  experience : Experience[];  
}