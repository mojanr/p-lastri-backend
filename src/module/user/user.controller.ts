import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

   // get all user
   @Get()
   async getUsers() {
     return this.userService.getUsers()
   }
 
   // create user
   @Post()
   async createUser(@Body() newUser: CreateUserDto) {
     return this.userService.createUser(newUser)
    //  return false
   }
  
}
