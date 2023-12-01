import  { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { EducationDegree } from './Education';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { Education_Projects } from './Education_Projects';

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

  @OneToMany(()=> Experience, (exp)=> exp.userCV ,  { cascade: true, eager: true} )
  experience : Experience[];  

  @OneToMany(()=> Projects, (project)=> project.userCV ,  { cascade: true, eager: true} )
  projects : Projects[]; 
  
  @OneToMany(()=> Education_Projects , (educationProject)=> educationProject.userCV ,  { cascade: true, eager: true} )
  educationProjects : Education_Projects[];  
}