import  { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserCv } from './UserCv';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity({ name: 'experiences' })
export class Experience extends AbstractEntity<Experience> {



  @ManyToOne(()=> UserCv , (cv)=> cv.experience , { orphanedRowAction: 'delete' })
  @JoinColumn()
  userCV: UserCv
}