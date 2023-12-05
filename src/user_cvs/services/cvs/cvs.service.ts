import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCv } from 'src/typeorm/entities/UserCv';
import { User } from 'src/typeorm/entities/User';
import { CreateUserCvsParams, UpdateUserCvsParams } from 'src/utils/types';
import { Pictures } from 'src/typeorm/entities/Pictures';
import { Thumbnails } from 'src/typeorm/entities/Thumbnails';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(UserCv) private userCvRepoitory: Repository<UserCv>,
    @InjectRepository(User) private userRepoitory: Repository<User>,
    private configService: ConfigService,
  ) {}
  private dbUser = this.configService.get<string>('REMOTE_SERVER_PATH');

  async fetchUserCvs() {
    const userCVs = await this.userCvRepoitory.find({relations:{thumbnail: true}});
    for (let i = 0; i < userCVs.length; i++) {

      if (userCVs[i].thumbnail) {
        userCVs[i].thumbnail.fileName =
          this.dbUser + userCVs[i].thumbnail.fileName;
      }
    }

    return userCVs;
  }
  async fetchUserCvById(id: number) {
    const userCVById = await this.userCvRepoitory.findOne({
      where: {
        id: id,
      },
      relations:{
        education : true,
        projects: true,
        educationProjects: true,
        picture: true,
        experience: true,
      }
    });

    if (userCVById.picture) {
      userCVById.picture.fileName = this.dbUser + userCVById.picture.fileName;
    }
    return userCVById;
  }
  deleteUserCvById(id: number) {
    return this.userCvRepoitory.delete({ id });
  }
  async createUserCv(
    id: number,
    userCvDetails: CreateUserCvsParams,
    files: {
      picture?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
  ) {
    const user = await this.userRepoitory.findOneBy({ id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const newUserCVs = this.userCvRepoitory.create({
      ...userCvDetails,
      user,
    });
    if (files.picture) {
      const picture = new Pictures();
      picture.fileName = files.picture[0].filename;
      newUserCVs.picture = picture;
    }
    if (files.thumbnail) {
      const thumbnail = new Thumbnails();
      thumbnail.fileName = files.thumbnail[0].filename;
      newUserCVs.thumbnail = thumbnail;
    }

    //  return newUserCVs
    return await this.userCvRepoitory.save(newUserCVs);
  }
  async updateUserCv(
    id: number,
    userCvDetails: UpdateUserCvsParams,
    files: {
      picture?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    }
  ) {
    const UserCv = await this.userCvRepoitory.findOne({
      where: {
        id: id,
      },
    });

    if (!UserCv) {
      throw new HttpException('user CV not found', HttpStatus.BAD_REQUEST);
    }
    if (files.picture) {
      const picture = new Pictures();
      picture.fileName = files.picture[0].filename;
      UserCv.picture = picture;
    }
    if (files.thumbnail) {
      const thumbnail = new Thumbnails();
      thumbnail.fileName = files.thumbnail[0].filename;
      UserCv.thumbnail = thumbnail;
    }

    const updatedCV = await this.userCvRepoitory.save({
      ...UserCv,
      ...userCvDetails,
    });

    return updatedCV;
  }
}
