import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './shared/config/config.module';
import { DatabaseModule } from './shared/database/database.module';
import { ModuleModule } from './module/module.module';
import { UploadModule } from './shared/upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './database/repository/user.repository';
import { RoleRepository } from './database/repository/role.repository';
import { SubmissionTypeRepository } from './database/repository/submission-type.repository';

@Module({
  imports: [ConfigModule, DatabaseModule, ModuleModule, UploadModule,  TypeOrmModule.forFeature([RoleRepository, UserRepository, SubmissionTypeRepository])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
