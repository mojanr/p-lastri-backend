import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Role } from './database/entity/role.entity';
import { SubmissionType } from './database/entity/submission-type.entity';
import { UserInfo } from './database/entity/user-info.entity';
import { User } from './database/entity/user.entity';
import { RoleRepository } from './database/repository/role.repository';
import { SubmissionTypeRepository } from './database/repository/submission-type.repository';
import { UserRepository } from './database/repository/user.repository';

@Injectable()
export class AppService implements OnApplicationBootstrap {

  constructor(
    @InjectRepository(RoleRepository) private roleRepo: RoleRepository,
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(SubmissionTypeRepository) private submissionTypeRepo: SubmissionTypeRepository,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  @Transaction()
  async onApplicationBootstrap(@TransactionManager() manager?: EntityManager) {
    // init role
    const initRole = [
      'Admin',
      'Verifikator',
      'Helpdesk',
      'Provider'
    ]
    // init user
    const initUser = [
      {
        username: 'system@admin.com',
        password: '@Admin123!',
        name: 'Admin',
        role: 'Admin'
      },
      {
        username: 'system@verifikator.com',
        password: '@Verifikator123!',
        name: 'Verifikator',
        role: 'Verifikator'
      },
      {
        username: 'system@helpdesk.com',
        password: '@Helpdesk123!',
        name: 'Helpdesk',
        role: 'Helpdesk'
      },
      {
        username: 'system@provider.com',
        password: '@Provider123!',
        name: 'Provider',
        role: 'Provider'
      }
    ]
    // init submission type
    const initSubmissionType = [
      {
        name: 'Pembuatan Akun Baru',
        description: 'Pembuatan Akun Baru'
      },
      {
        name: 'Ganti Email',
        description: 'Ganti Email'
      },
      {
        name: 'Ubah Data',
        description: 'Ubah Data'
      }
    ]

    // create role if not exist
    for (const roleData of initRole) {
      // get role
      const role = await this.roleRepo.findOne({ where: { name: roleData } })
      // check if role not exist
      if (!role) {
        // create new role
        const newRole = new Role()
        newRole.name = roleData
        newRole.description = roleData
        await newRole.save()
      }
    }
    // await initRole.forEach(async (roleName, index) => {

    // })

    for (const userData of initUser) {
      // get user
      const user = await this.userRepo.findOne({ where: { username: userData.username } })
      // check if user not exist
      if (!user) {
        // get role
        const role = await this.roleRepo.findOne({ where: { name: userData.role } })
        console.log('role', userData.role, role)
        // new user info
        const newUserInfo = new UserInfo()
        newUserInfo.name = userData.name
        await newUserInfo.save()
        // create new user
        const newUser = new User()
        newUser.username = userData.username
        newUser.email = userData.username
        newUser.password = userData.password
        newUser.role = role
        newUser.info = newUserInfo
        await newUser.save()
      }
    }

    // // create admin user
    // await initUser.forEach(async (userData: any, index) => {

    // })
    for (const submissionTypeData of initSubmissionType) {
      // get submission type
      const submissionType = await this.submissionTypeRepo.findOne({ where: { name: submissionTypeData.name } })
      // check if submission type not exist
      if (!submissionType) {
        // create new role
        const newSubmissionType = new SubmissionType()
        newSubmissionType.name = submissionTypeData.name
        newSubmissionType.description = submissionTypeData.description
        await newSubmissionType.save()
      }
    }


    // // create submission type
    // await initSubmissionType.forEach(async (submissionTypeData, index) => {

    // })
  }
}
