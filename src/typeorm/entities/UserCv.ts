import  { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { EducationDegree } from './Education';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { Education_Projects } from './Education_Projects';
import { Pictures } from './Pictures';
import { Thumbnails } from './Thumbnails';

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

  @Column({default: true})
  enablePhoto: boolean;
  
  @Column({default: true})
  enableBio: boolean;

  @Column({default: true})
  enableInfos: boolean;

  @Column({default: true})
  enableAddresse: boolean;

  @Column({default: true})
  enablePhone: boolean;

  @Column({default: true})
  enableEmail: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn ()
  updatedAt: Date;

  @ManyToOne(()=> User , (user)=> user.userCvs )
  user: User

  @OneToMany(()=> EducationDegree, (degree)=> degree.userCV, {  cascade: true }  )
  education : EducationDegree[];  

  @OneToMany(()=> Experience, (exp)=> exp.userCV, {  cascade: true }  )
  experience : Experience[];  

  @OneToMany(()=> Projects, (project)=> project.userCV , {  cascade: true } )
  projects : Projects[]; 
  
  @OneToMany(()=> Education_Projects , (educationProject)=> educationProject.userCV , {  cascade: true }  )
  educationProjects : Education_Projects[];  


  @OneToOne(()=> Pictures, picture => picture.cv , {  cascade: true } )
  @JoinColumn()
  picture : Pictures  
  
  @OneToOne(()=> Thumbnails, picture => picture.cv , {  cascade: true } )
  @JoinColumn()
  thumbnail : Thumbnails  
  
}