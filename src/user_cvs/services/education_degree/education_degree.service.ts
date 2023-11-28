import { Injectable } from '@nestjs/common';
import {  InjectRepository } from '@nestjs/typeorm';
import { EducationDegree } from 'src/typeorm/entities/Education';
import { Repository } from 'typeorm';

@Injectable()
export class EducationDegreeService {
    constructor(@InjectRepository(EducationDegree) private userEducationDegreeRepoitory: Repository<EducationDegree>, ){}

    

    async fetchEducationDegreByCVid(id: number){
        return this.userEducationDegreeRepoitory.findOneBy({id})
    }
    deleteEducationDegreByCVid(id: number){
        return this.userEducationDegreeRepoitory.delete({id})
    }

    updateEducationDegreByCVid(id: number){
        return this.userEducationDegreeRepoitory.delete({id})
    }
}
