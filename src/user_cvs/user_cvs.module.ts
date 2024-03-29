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
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { Pictures } from 'src/typeorm/entities/Pictures';
import {extname} from 'path';



@Module({
    imports: [TypeOrmModule.forFeature([UserCv, User, EducationDegree, Experience, Projects, Pictures]),    
    MulterModule.register({
        dest: 'C:/xampp/htdocs/nestjs/pictures',

        storage: diskStorage({
          // Destination storage path details
          destination: (req: any, file: any, cb: any) => {
            const uploadPath = "C:/xampp/htdocs/nestjs/pictures";
            // Create folder if doesn't exist
            cb(null, uploadPath);
        },
          // File modification details
          filename: (req, file, callback) => {            
              // Calling the callback passing the random name generated with the original extension name
              callback(null, `${uuid()}${extname(file.originalname)}`);
          },
      })
      }),
      
    ],
    controllers: [CvsController],
    providers: [CvsService],
})
export class UserCvsModule {}


