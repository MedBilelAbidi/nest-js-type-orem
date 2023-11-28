import  { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { EducationDegree } from './Education';

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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(()=> User , (user)=> user.userCvs)
  user: User

  @OneToMany(()=> EducationDegree, (degree)=> degree.userCV)
  @JoinColumn()
  education_degree : EducationDegree[];  
}