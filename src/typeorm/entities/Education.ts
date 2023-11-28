import  { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserCv } from './UserCv';

@Entity({ name: 'education_degree' })
export class EducationDegree {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  discription: string;



  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(()=> UserCv , (cv)=> cv.education_degree)
  userCV: UserCv
}