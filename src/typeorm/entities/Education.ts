import  { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserCv } from './UserCv';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'education_degree' })
export class EducationDegree extends AbstractEntity<EducationDegree> {



  @ManyToOne(()=> UserCv , (cv)=> cv.experience , { orphanedRowAction: 'delete' , onDelete: "CASCADE" })
  @JoinColumn()
  userCV: UserCv
}