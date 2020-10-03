import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/database/entity/user-info.entity';
import { User } from 'src/database/entity/user.entity';
import { RoleRepository } from 'src/database/repository/role.repository';
import { UserRepository } from 'src/database/repository/user.repository';
import { EntityManager, Transaction, TransactionManager, TransactionRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(RoleRepository) private roleRepo: RoleRepository
  ) { }

  // get all user
  async getUsers(): Promise<User[]> {
    return this.userRepo.find({ relations: ['role', 'info'], order: { createdDate: 'ASC' } })
  }

  // create new user
  @Transaction()
  async createUser(userData: CreateUserDto, @TransactionManager() manager?: EntityManager): Promise<User> {
    // destruct
    const {
      name,
      roleId,
      email,
      password
    } = userData

    // get role
    const role = await this.roleRepo.findOne(roleId).catch(error => { throw new NotFoundException() })

    // new user info
    const newUserInfo = new UserInfo()
    newUserInfo.name = name
    const resultNewUserInfo = await manager.save(newUserInfo)

    // new user
    const newUser = new User()
    newUser.username = email
    newUser.email = email
    newUser.password = password
    newUser.role = role
    newUser.info = newUserInfo
    const resultNewUser = await manager.save(newUser)

    // return new user created
    return resultNewUser
  }
}
