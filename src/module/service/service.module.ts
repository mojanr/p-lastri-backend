import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from 'src/database/repository/service.repository';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRepository])
  ],
  providers: [ServiceService],
  controllers: [ServiceController]
})
export class ServiceModule {}
