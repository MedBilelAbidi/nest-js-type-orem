import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCv } from 'src/typeorm/entities/UserCv';
import { User } from 'src/typeorm/entities/User';
import { CreateUserCvsParams } from 'src/utils/types';
import { EducationDegree } from 'src/typeorm/entities/Education';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(UserCv) private userCvRepoitory: Repository<UserCv>,
    @InjectRepository(User) private userRepoitory: Repository<User>,
    @InjectRepository(EducationDegree) private educationDegreeRepoitory: Repository<EducationDegree>,

  ) {}

  fetchUserCvs() {
    return this.userCvRepoitory.find({ relations: ['education'] });
  }
  fetchUserCvById(id: number) {
    return this.userCvRepoitory.findOneBy({ id });
  }
  deleteUserCvById(id: number) {
    return this.userCvRepoitory.delete({ id });
  }
  async createUserCv(id: number, userCvDetails: CreateUserCvsParams) {
    const user = await this.userRepoitory.findOneBy({ id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const newUserCVs = this.userCvRepoitory.create({
      ...userCvDetails,
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }); 
    return await this.userCvRepoitory.save(newUserCVs);

  }
  async updateUserCv(id: number, userCvDetails: CreateUserCvsParams) {
    const UserCv = await this.userCvRepoitory.findOne({
      where: {
        id: id,
      }
    });
    const Ededucation = await this.educationDegreeRepoitory.findOne({ 
       where: {
      userCV: {
        id : id
      },
    },
  relations: {
    userCV: true
  }});
    if (!UserCv) {
      throw new HttpException('user CV not found', HttpStatus.BAD_REQUEST);
    }

    const education = userCvDetails.education
    delete userCvDetails.education

    
    const updatedCV = await this.userCvRepoitory.save(
      {
        ... UserCv,
        ...userCvDetails,
      },
    );
    
      const UpdatEdeducation = await this.educationDegreeRepoitory.save(
        {
          ... UserCv,
          ...Ededucation,
          ...education,
        },
      );
      return {...updatedCV , ...{education : UpdatEdeducation}}
  }
}
