import  { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserCv } from './UserCv';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'projects' })
export class Projects extends AbstractEntity<Projects> {



  @ManyToOne(()=> UserCv , (cv)=> cv.projects , { orphanedRowAction: 'delete' })
  @JoinColumn()
  userCV: UserCv
}