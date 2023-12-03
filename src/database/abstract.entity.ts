import  { Column, CreateDateColumn, UpdateDateColumn , PrimaryGeneratedColumn} from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
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

  
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}