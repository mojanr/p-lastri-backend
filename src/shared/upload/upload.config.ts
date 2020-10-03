import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer'

@Injectable()
export class UploadConfig implements MulterOptionsFactory {
  constructor(private configService: ConfigService) { }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './storage'
      })
    }
  }
}
