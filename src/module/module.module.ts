import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { ProviderModule } from './provider/provider.module';
import { SubmissionModule } from './submission/submission.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ServiceModule, RoleModule, UserModule, ProviderModule, SubmissionModule, AuthModule]
})
export class ModuleModule {}
