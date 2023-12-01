import { Module } from '@nestjs/common';
import { CvsController } from './controllers/cvs/cvs.controller';
import { CvsService } from './services/cvs/cvs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCv } from 'src/typeorm/entities/UserCv';
import { User } from 'src/typeorm/entities/User';
import { EducationDegree } from 'src/typeorm/entities/Education';
import { Experience } from 'src/typeorm/entities/Experience';
import { Projects } from 'src/typeorm/entities/Projects';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [TypeOrmModule.forFeature([UserCv, User, EducationDegree, Experience, Projects]),    
    MulterModule.register({
        dest: 'C:/Users/RAZER/Desktop/nest/nest-js-type-orem/pictures',
      }),],
    controllers: [CvsController],
    providers: [CvsService],
})
export class UserCvsModule {}
