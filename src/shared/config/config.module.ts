import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as DefaultConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    DefaultConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `./.env.${process.env?.NODE_ENV || 'development'}`,
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
