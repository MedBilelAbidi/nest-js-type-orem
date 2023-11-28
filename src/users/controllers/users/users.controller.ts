import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post()
  createUsers(@Body() createUserDto: CreateUserDto) {
   return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUsersById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
      this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id)
  }
  @Post(':id/profile')
  createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() createUserProfile : CreateUserProfileDto){
    return this.userService.createUserProfile(id, createUserProfile)
  } 
}
