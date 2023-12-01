import  { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserCv } from './UserCv';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'education_projects' })
export class Education_Projects extends AbstractEntity<Education_Projects> {



  @ManyToOne(()=> UserCv , (cv)=> cv.educationProjects , { orphanedRowAction: 'delete' })
  @JoinColumn()
  userCV: UserCv
}