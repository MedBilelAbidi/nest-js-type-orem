import  { Column, CreateDateColumn, UpdateDateColumn , PrimaryGeneratedColumn, Entity, OneToOne} from 'typeorm';
import { UserCv } from './UserCv';


@Entity({ name: 'thumbnails' })
export class Thumbnails {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  fileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn ()
  updatedAt: Date;
  
  @OneToOne(() => UserCv, cv => cv.thumbnail ,  { orphanedRowAction: 'delete' }) // Define the inverse relationship
  cv: UserCv;
  
  constructor(entity?: Thumbnails) {
    Object.assign(this, entity);
  }
}