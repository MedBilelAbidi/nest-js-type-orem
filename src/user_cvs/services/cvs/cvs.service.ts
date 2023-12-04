import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCv } from 'src/typeorm/entities/UserCv';
import { User } from 'src/typeorm/entities/User';
import { CreateUserCvsParams, UpdateUserCvsParams } from 'src/utils/types';
import { EducationDegree } from 'src/typeorm/entities/Education';
import { Pictures } from 'src/typeorm/entities/Pictures';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(UserCv) private userCvRepoitory: Repository<UserCv>,
    @InjectRepository(User) private userRepoitory: Repository<User>,
    @InjectRepository(User) private userEducationRepoitory: Repository<EducationDegree>,

    private readonly entityManager: EntityManager

  ) {}

  fetchUserCvs() {
    return this.userCvRepoitory.find();
  }
  async fetchUserCvById(id: number) {
    console.log(id);
    
    return await this.userCvRepoitory.findOne({where : {
      id : id
    }});
  }
  deleteUserCvById(id: number) {
    return this.userCvRepoitory.delete({ id });
  }
  async createUserCv(id: number, userCvDetails: CreateUserCvsParams, file: Express.Multer.File) {
    const user = await this.userRepoitory.findOneBy({ id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const newUserCVs = this.userCvRepoitory.create({
      ...userCvDetails,
      user,
    }); 
    if (file) {
      const picture = new Pictures()
      picture.fileName = file.path
      newUserCVs.picture = picture
    }

    console.log(newUserCVs);
    
   //  return newUserCVs
     return await this.userCvRepoitory.save(newUserCVs);

  }
  async updateUserCv(id: number, userCvDetails: UpdateUserCvsParams, file: Express.Multer.File) {
    const UserCv = await this.userCvRepoitory.findOne({
      where: {
        id: id,
      }
    });
    
    if (!UserCv) {
      throw new HttpException('user CV not found', HttpStatus.BAD_REQUEST);
    }
    if (file) {
      const picture = new Pictures()
      picture.fileName = file.path
      UserCv.picture = picture
    }
    const updatedCV = await this.userCvRepoitory.save(
      {
        ... UserCv,
        ...userCvDetails,
      },
    );
    
      return updatedCV
  }
}
