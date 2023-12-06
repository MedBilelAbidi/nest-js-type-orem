import  { Column, CreateDateColumn, UpdateDateColumn , PrimaryGeneratedColumn, Entity, OneToOne} from 'typeorm';
import { UserCv } from './UserCv';


@Entity({ name: 'pictures' })
export class Pictures {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  fileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn ()
  updatedAt: Date;
  
  @OneToOne(() => UserCv, cv => cv.picture ,  { orphanedRowAction: 'delete',  onDelete: "CASCADE" }) // Define the inverse relationship
  cv: UserCv;
  
  constructor(entity?: Pictures) {
    Object.assign(this, entity);
  }
}