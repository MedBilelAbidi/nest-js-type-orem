import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorm/entities/Profile';
import { UserCv } from './typeorm/entities/UserCv';
import { UserCvsModule } from './user_cvs/user_cvs.module';
import { EducationDegree } from './typeorm/entities/Education';
import { Experience } from './typeorm/entities/Experience';
import { Projects } from './typeorm/entities/Projects';
import { Education_Projects } from './typeorm/entities/Education_Projects';
import { Pictures } from 'src/typeorm/entities/Pictures';
import { Thumbnails } from './typeorm/entities/Thumbnails';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'react_cv_db',
      entities: [User, Profile, UserCv, EducationDegree, Experience, Projects, Education_Projects, Pictures, Thumbnails ],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,

    }),

    UsersModule,
    UserCvsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
