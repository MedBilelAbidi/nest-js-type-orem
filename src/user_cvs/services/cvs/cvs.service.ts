import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCv } from 'src/typeorm/entities/UserCv';
import { User } from 'src/typeorm/entities/User';
import { CreateUserCvsParams } from 'src/utils/types';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(UserCv) private userCvRepoitory: Repository<UserCv>,
    @InjectRepository(User) private userRepoitory: Repository<User>,
  ) {}

  fetchUserCvs() {
    return this.userCvRepoitory.find();
  }
  fetchUserCvById(id: number) {
    return this.userCvRepoitory.findOneBy({ id });
  }
  deleteUserCvById(id: number) {
    return this.userCvRepoitory.delete({ id });
  }
  async createUserProfile(id: number, userCvDetails: CreateUserCvsParams) {
    const user = await this.userRepoitory.findOne({
      where: {
        id: id,
      },
      relations: {
        userCvs: true,
      },
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    console.log(user);

    if (user.userCvs && user.userCvs.length) {
      throw new HttpException('profile alrady exisit', HttpStatus.BAD_REQUEST);
    }
    const newUserCVs = this.userCvRepoitory.create({
      ...userCvDetails,
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.userCvRepoitory.save(newUserCVs);
  }
}
