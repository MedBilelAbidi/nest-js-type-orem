import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepoitory: Repository<User>,
    @InjectRepository(Profile) private profileRepoitory: Repository<Profile>,
  ) {}

  fetchUsers() {
    return this.userRepoitory.find({relations: ['profile','userCvs']})
  }

  createUser(userDetail: CreateUserParams) {
    const newUser = this.userRepoitory.create({...userDetail, createdAt: new Date()})
    return  this.userRepoitory.save(newUser)
  }

  updateUser(id: number , userUpdates: UpdateUserParams) {
    return  this.userRepoitory.update({id} , {...userUpdates})
  }

  deleteUser(id: number ) {
    return  this.userRepoitory.delete({id})
  }

  async createUserProfile(id:number, userProfileDetails: CreateUserProfileParams){
    const user = await this.userRepoitory.findOne({
      where: {
          id: id,
      },
      relations: {
          profile: true,
      },
  })
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    console.log(user);
    
    if (user.profile) {
      throw new HttpException('profile alrady exisit', HttpStatus.BAD_REQUEST);

    }
    const newProfile = this.profileRepoitory.create({...userProfileDetails, createdAt: new Date()})
    const saveProfile = await this.profileRepoitory.save(newProfile)
    user.profile = saveProfile
    return this.userRepoitory.save(user)
  }
}
