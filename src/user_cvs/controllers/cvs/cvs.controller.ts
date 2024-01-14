import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch, UseInterceptors,  UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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

    isJSONString(str: string) {
        try {
          return JSON.parse(str);
        } catch (error) {
          return str;
        }
      }
    
    @Post(':id' )
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ]))
    createUserCv(@Param('id', ParseIntPipe) id: number, @Body() createUserCvDto: CreateUserCVsDto , 
    @UploadedFiles() files: { picture?: Express.Multer.File[], thumbnail?: Express.Multer.File[] }){
   

        Object.keys(createUserCvDto).map(key => {
                createUserCvDto[key] = this.isJSONString(createUserCvDto[key])
        })
        
        return this.userCVservice.createUserCv(id , createUserCvDto, files)
    }
    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ]))
    updateUserCv(@Param('id', ParseIntPipe) id: number, @Body() updateUserCvDto: UpateUserCVsDto,
    @UploadedFiles() files: { picture?: Express.Multer.File[], thumbnail?: Express.Multer.File[] }){

    
    Object.keys(updateUserCvDto).map(key => {
        updateUserCvDto[key] = this.isJSONString(updateUserCvDto[key])
})

        return this.userCVservice.updateUserCv(id, updateUserCvDto, files)
    }
    @Delete(':id')
    deleteUserCv(@Param('id', ParseIntPipe) id: number){
        return this.userCVservice.deleteUserCvById(id)
    }
    @Get(':id')
    getCvByUserId(@Param('id', ParseIntPipe) id: number){
        return this.userCVservice.fetchUserCvById(id)
    }

}
