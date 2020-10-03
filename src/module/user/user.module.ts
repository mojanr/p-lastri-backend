import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repository/user.repository';
import { RoleRepository } from 'src/database/repository/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
