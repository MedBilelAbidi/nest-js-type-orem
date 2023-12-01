import { Body, Controller, Delete, Get, Param, ParseIntPipe,ParseFilePipe, Post, Patch, UseInterceptors, UploadedFile, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserCVsDto } from 'src/user_cvs/dto/CreateUserCVs.dto';
import { UpateUserCVsDto } from 'src/user_cvs/dto/UpateUserCVs.dto';
import { CvsService } from 'src/user_cvs/services/cvs/cvs.service';

@Controller('cvs')
export class CvsController {

    constructor(private userCVservice: CvsService){}
    @Get()
    getAllUserCv(){
       return this.userCVservice.fetchUserCvs()
    }

    isJSONString(str) {
        try {
          return JSON.parse(str);
        } catch (error) {
          return str;
        }
      }
    
    @Post(':id' )
    @UseInterceptors(FileInterceptor('file'))
    createUserCv(@Param('id', ParseIntPipe) id: number, @Body() createUserCvDto: CreateUserCVsDto , 
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType: 'image/*'})
            ]
        })
    ) file: Express.Multer.File){
        console.log('post id');
        console.log(file);
        console.log(createUserCvDto);

        Object.keys(createUserCvDto).map(key => {
                createUserCvDto[key] = this.isJSONString(createUserCvDto[key])
        })
        
        return createUserCvDto
        // return this.userCVservice.createUserCv(id , createUserCvDto)
    }
    @Post('up/upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      return file
    } 

    @Delete(':id')
    deleteUserCv(@Param('id', ParseIntPipe) id: number){
        return this.userCVservice.deleteUserCvById(id)
    }
    @Get(':id')
    getCvByUserId(@Param('id', ParseIntPipe) id: number){
        return this.userCVservice.fetchUserCvById(id)
    }
    @Patch(':id')
    updateUserCv(@Param('id', ParseIntPipe) id: number, @Body() updateUserCvDto: UpateUserCVsDto){
        return this.userCVservice.updateUserCv(id, updateUserCvDto)
    }
}
