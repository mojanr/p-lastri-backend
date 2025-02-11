import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from 'src/database/repository/role.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository])
  ],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
