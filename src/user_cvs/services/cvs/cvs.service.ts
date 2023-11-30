import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCv } from 'src/typeorm/entities/UserCv';
import { User } from 'src/typeorm/entities/User';
import { CreateUserCvsParams, UpdateUserCvsParams } from 'src/utils/types';
import { EducationDegree } from 'src/typeorm/entities/Education';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(UserCv) private userCvRepoitory: Repository<UserCv>,
    @InjectRepository(User) private userRepoitory: Repository<User>,
    @InjectRepository(User) private userEducationRepoitory: Repository<EducationDegree>,

    private readonly entityManager: EntityManager,

  ) {}

  fetchUserCvs() {
    return this.userCvRepoitory.find({ relations: ['education'] });
  }
  fetchUserCvById(id: number) {
    return this.userCvRepoitory.findOne({where : {
      id : id
    }
  , relations : {
    education : true
  }},);
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
    }); 
    return await this.userCvRepoitory.save(newUserCVs);

  }
  async updateUserCv(id: number, userCvDetails: UpdateUserCvsParams) {
    const UserCv = await this.userCvRepoitory.findOne({
      where: {
        id: id,
      },
      relations: {
        education: true
      }
    });

    if (!UserCv) {
      throw new HttpException('user CV not found', HttpStatus.BAD_REQUEST);
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
