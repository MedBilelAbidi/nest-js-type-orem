import { Module } from '@nestjs/common';
import { CvsController } from './controllers/cvs/cvs.controller';
import { CvsService } from './services/cvs/cvs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCv } from 'src/typeorm/entities/UserCv';
import { User } from 'src/typeorm/entities/User';
import { EducationDegree } from 'src/typeorm/entities/Education';

@Module({
    imports: [TypeOrmModule.forFeature([UserCv, User, EducationDegree])],
    controllers: [CvsController],
    providers: [CvsService],
})
export class UserCvsModule {}
