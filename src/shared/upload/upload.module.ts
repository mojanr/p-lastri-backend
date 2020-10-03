import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UploadConfig } from './upload.config';
import { UploadService } from './upload.service';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: UploadConfig,
      inject: [ConfigService],
    })
  ],
  providers: [UploadService]
})
export class UploadModule {}
