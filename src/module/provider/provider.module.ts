import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderRepository } from 'src/database/repository/provider.repository';
import { RoleRepository } from 'src/database/repository/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderRepository, RoleRepository])
  ],
  providers: [ProviderService],
  controllers: [ProviderController],
  exports: [ProviderService]
})
export class ProviderModule {}
