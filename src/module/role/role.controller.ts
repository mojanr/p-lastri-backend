import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

  constructor(private roleService: RoleService) { }

  // get all role
  @Get()
  async getRoles() {
    return this.roleService.getRoles()
  }

  // create role
  @Post()
  async createRole(@Body() newRole: CreateRoleDto) {
    return this.roleService.createRole(newRole)
  }
  
}
