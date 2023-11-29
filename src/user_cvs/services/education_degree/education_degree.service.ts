import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {  InjectRepository } from '@nestjs/typeorm';
import { EducationDegree } from 'src/typeorm/entities/Education';
import { UserCv } from 'src/typeorm/entities/UserCv';
import { CvPropsDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class EducationDegreeService {
    constructor(
        @InjectRepository(EducationDegree) private userEducationDegreeRepoitory: Repository<EducationDegree>,
        @InjectRepository(UserCv) private userCvRepoitory: Repository<UserCv>,
    ){}

    

    async fetchEducationDegreByCVid(id: number){
        return this.userEducationDegreeRepoitory.findOneBy({id})
    }
    deleteEducationDegreByCVid(id: number){
        return this.userEducationDegreeRepoitory.delete({id})
    }

   async createEducationDegreByCVid(id: number, educationDetail: CvPropsDetails){
        const userCV = await this.userCvRepoitory.findOneBy({id});
          if (!userCV) {
            throw new HttpException('user CV not found', HttpStatus.BAD_REQUEST);
          }
          const newEducationDegree = this.userEducationDegreeRepoitory.create({
            ...educationDetail,
            
            userCV,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          return await this.userEducationDegreeRepoitory.save(newEducationDegree);
    }
 
  
}

