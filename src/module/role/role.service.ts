import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/entity/role.entity';
import { RoleRepository } from 'src/database/repository/role.repository';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {

  constructor(@InjectRepository(RoleRepository) private roleRepo: RoleRepository) { }

  // get all role
  async getRoles(): Promise<Role[]> {
    return this.roleRepo.find()
  }

  // create role
  async createRole(roleData: CreateRoleDto): Promise<Role> {
    const {
      name,
      description
    } = roleData

    const newRole = new Role()
    newRole.name = name
    newRole.description = description
  
    const result = newRole.save()
    return result
  }

}
