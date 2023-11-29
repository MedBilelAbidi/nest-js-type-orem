import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserCVsDto } from 'src/user_cvs/dto/CreateUserCVs.dto';
import { CvsService } from 'src/user_cvs/services/cvs/cvs.service';

@Controller('cvs')
export class CvsController {

    constructor(private userCVservice: CvsService){}
    @Get()
    getAllUserCv(){
       return this.userCVservice.fetchUserCvs()
    }
    @Post(':id' )
    createUserCv(@Param('id', ParseIntPipe) id: number, @Body() createUserCvDto: CreateUserCVsDto){
        return this.userCVservice.createUserCv(id , createUserCvDto)
    }
    @Delete(':id')
    deleteUserCv(@Param('id', ParseIntPipe) id: number){
        return this.userCVservice.deleteUserCvById(id)
    }
    @Get(':id')
    getCvByUserId(@Param('id', ParseIntPipe) id: number){
        return this.userCVservice.fetchUserCvById(id)
    }
    @Put(':id')
    updateUserCv(@Param('id', ParseIntPipe) id: number, @Body() updateUserCvDto: CreateUserCVsDto){
        return this.userCVservice.updateUserCv(id, updateUserCvDto)
    }
}
