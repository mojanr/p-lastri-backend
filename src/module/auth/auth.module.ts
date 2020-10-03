import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderRepository } from 'src/database/repository/provider.repository';
import { RoleRepository } from 'src/database/repository/role.repository';
import { ProviderModule } from '../provider/provider.module';
import { UserRepository } from 'src/database/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderRepository, RoleRepository, UserRepository]),
    ProviderModule,
    JwtModule.register({
      secret: 'secretjwttoken123!',
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
