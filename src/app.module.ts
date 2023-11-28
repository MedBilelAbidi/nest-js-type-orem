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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_nestjs_db',
      entities: [User, Profile, UserCv, EducationDegree ],
      synchronize: true,
    }),
    UsersModule,
    UserCvsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
