import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionRepository } from 'src/database/repository/submission.repository';
import { SubmissionTypeRepository } from 'src/database/repository/submission-type.repository';
import { SubmissionTypeRequirementRepository } from 'src/database/repository/submission-type-requirement.repository';
import { SubmissionRequirement } from 'src/database/entity/submission-requirement.entity';
import { SubmissionRequirementRepository } from 'src/database/repository/submission-requirement.repository';
import { ProviderRepository } from 'src/database/repository/provider.repository';
import { UserRepository } from 'src/database/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubmissionTypeRepository, 
      SubmissionTypeRequirementRepository, 
      SubmissionRepository,
      SubmissionRequirementRepository,
      ProviderRepository,
      UserRepository
    ])
  ],
  providers: [SubmissionService],
  controllers: [SubmissionController]
})
export class SubmissionModule {}
