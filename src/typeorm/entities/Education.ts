import  { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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



  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn ()
  updatedAt: Date;

  @ManyToOne(()=> UserCv , (cv)=> cv.education, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userCV: UserCv
}