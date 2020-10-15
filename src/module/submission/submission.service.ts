import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionRequirement } from 'src/database/entity/submission-requirement.entity';
import { SubmissionTypeRequirement } from 'src/database/entity/submission-type-requirement.entity';
import { SubmissionType } from 'src/database/entity/submission-type.entity';
import { Submission } from 'src/database/entity/submission.entity';
import { ProviderRepository } from 'src/database/repository/provider.repository';
import { SubmissionRequirementRepository } from 'src/database/repository/submission-requirement.repository';
import { SubmissionTypeRequirementRepository } from 'src/database/repository/submission-type-requirement.repository';
import { SubmissionTypeRepository } from 'src/database/repository/submission-type.repository';
import { SubmissionRepository } from 'src/database/repository/submission.repository';
import { UserRepository } from 'src/database/repository/user.repository';
import { CreateSubmissionTypeDto } from './dto/create-submission-type.dto';

interface RequirementData {
  name: string
  description: string
  template: string
  isRequired: boolean
}

@Injectable()
export class SubmissionService {

  constructor(
    @InjectRepository(SubmissionTypeRepository) private submissionTypeRepo: SubmissionTypeRepository,
    @InjectRepository(SubmissionTypeRequirementRepository) private submissionTypeRequirementRepo: SubmissionTypeRequirementRepository,
    @InjectRepository(SubmissionRepository) private submissionRepo: SubmissionRepository,
    @InjectRepository(SubmissionRequirementRepository) private submissionRequirementRepo: SubmissionRequirementRepository,
    @InjectRepository(ProviderRepository) private providerRepo: ProviderRepository,
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) { }

  // get all submission type
  async getSubmissionTypes(): Promise<SubmissionType[]> {
    return this.submissionTypeRepo.find({ order: { createdDate: 'ASC' } })
  }

  // create submission type
  async createSubmissionType(submissionTypeData: CreateSubmissionTypeDto): Promise<SubmissionType> {
    // destruct
    const {
      name,
      description
    } = submissionTypeData

    // new submission type
    const newSubmissionType = new SubmissionType()
    newSubmissionType.name = name
    newSubmissionType.description = description
    const resultNewSubmissionType = await newSubmissionType.save()

    // return new submission type
    return resultNewSubmissionType
  }

  // get submission requirement by submission type id
  async getSubmissionTypeRequirementBySubmissionTypeId(submissionTypeId: number): Promise<SubmissionTypeRequirement[]> {
    return this.submissionTypeRequirementRepo.find({ submissionType: { id: submissionTypeId } })
  }

  // create submission requirement by submission type id
  async createSubmissionTypeRequirementBySubmissionTypeId(submissionTypeId: number, requirementData: RequirementData): Promise<SubmissionTypeRequirement> {
    // destruct
    const {
      name,
      description,
      template,
      isRequired
    } = requirementData

    // get submission type
    const submissionType = await this.submissionTypeRepo.findOne(submissionTypeId).catch(error => { throw new NotFoundException() })

    // new submission type requirement
    const newSubmissionTypeRequirement = new SubmissionTypeRequirement()
    newSubmissionTypeRequirement.name = name
    newSubmissionTypeRequirement.description = description
    newSubmissionTypeRequirement.template = template
    newSubmissionTypeRequirement.required = isRequired
    newSubmissionTypeRequirement.submissionType = submissionType
    const resultNewSubmissionTypeRequirement = await newSubmissionTypeRequirement.save()

    // return new submission type
    return resultNewSubmissionTypeRequirement
  }

  // get active submission
  async getActiveSubmission(submissionTypeId: number, userId: string) {
    // get submission
    const result = await this.submissionRepo.findOne({
      where: [
        { submissionTypeId: submissionTypeId, createdBy: userId, status: 100 },
        { submissionTypeId: submissionTypeId, createdBy: userId, status: 101 }
      ], relations: ['submissionRequirements']
    }).catch(error => { throw new NotFoundException() })

    console.log('active submission', submissionTypeId, userId, result)
    return result
  }

  // create submission
  async createSubmission(submissionTypeId: number, userId: string) {
    // get submission type
    const submissionType = await this.submissionTypeRepo.findOne({ where: { id: submissionTypeId }, relations: ['submissionTypeRequirement'] }).catch(error => { throw new NotFoundException() })

    // const get user
    const user = await this.providerRepo.findOne({ where: { id: userId }, relations: ['info'] })

    console.log(user)

    // new submission
    const newSubmission = new Submission()
    newSubmission.submissionTypeId = submissionTypeId
    newSubmission.createdBy = userId
    newSubmission.name = user?.info?.name || 'admin'
    const resultNewSubmission = await newSubmission.save()

    // console.log('submission type reqirement', submissionType)

    // set requirement submission
    await submissionType.submissionTypeRequirement.forEach(async (submissionTypeRequirement, index) => {
      const newSubmissionRequirement = new SubmissionRequirement()
      newSubmissionRequirement.order = submissionTypeRequirement.order
      newSubmissionRequirement.name = submissionTypeRequirement.name
      newSubmissionRequirement.description = submissionTypeRequirement.description
      newSubmissionRequirement.template = submissionTypeRequirement.template
      newSubmissionRequirement.required = submissionTypeRequirement.required
      newSubmissionRequirement.submission = resultNewSubmission
      await newSubmissionRequirement.save()
    })
  }

  // cancel submission
  async cancelSubmission(submissionId: string) {
    // get submission
    const submission = await this.submissionRepo.findOne({
      where: {
        id: submissionId
      }, relations: ['submissionRequirements']
    }).catch(error => { throw new NotFoundException() })

    submission.status = 105
    await submission.save()
  }

  // submit submission
  async submitSubmission(submissionId: string) {
    // get submission
    const submission = await this.submissionRepo.findOne({
      where: {
        id: submissionId
      }, relations: ['submissionRequirements']
    }).catch(error => { throw new NotFoundException() })

    submission.status = 101
    await submission.save()
  }

  // approve submission requirement
  async approveSubmissionRequirement(submissionRequirementId: string) {
    // get submission requirement
    const submissionRequirement = await this.submissionRequirementRepo.findOne({ where: { id: submissionRequirementId } }).catch(error => { throw new NotFoundException() })
    submissionRequirement.status = 103
    await submissionRequirement.save()
  }

  // reject submission requirement
  async rejectSubmissionRequirement(submissionRequirementId: string, rejectReason: string) {
    // get submission
    // const submision = await this.submissionRepo.findOne

    // get submission requirement
    const submissionRequirement = await this.submissionRequirementRepo.findOne({ where: { id: submissionRequirementId } }).catch(error => { throw new NotFoundException() })
    submissionRequirement.status = 102
    submissionRequirement.reason = rejectReason
    await submissionRequirement.save()
  }

  // submit approval helpdesl
  async submitApprovalHelpdesk(submissionId: string) {
    // get submission
    const submission = await this.submissionRepo.findOne({
      where: {
        id: submissionId
      },
      relations: [
        'submissionRequirements'
      ]
    }).catch(error => { throw new NotFoundException() })

    // check if there is no reject
    const resultReject = submission.submissionRequirements.filter((value, index) => {
      return value.status == 102
    })

    console.log(resultReject)

    if (resultReject.length > 0) {
      submission.status = 100
    } else {
      submission.status = 101
      submission.helpdeskStatus = 103
      const submissionRequirements = await this.submissionRequirementRepo.find({
        where: {
          submission: submission
        }
      })

      await submissionRequirements.forEach(async (submissionRequirement, index) => {
        submissionRequirement.status = 100
        await submissionRequirement.save()
      })
    }

    await submission.save()
  }

  // submit approval verifikator
  async submitApprovalVerifikator(submissionId: string) {
    // get submission
    const submission = await this.submissionRepo.findOne({
      where: {
        id: submissionId
      },
      relations: [
        'submissionRequirements'
      ]
    }).catch(error => { throw new NotFoundException() })

    // check if there is no reject
    const resultReject = submission.submissionRequirements.filter((value, index) => {
      return value.status == 102
    })

    if (resultReject.length > 0) {
      submission.status = 100
    } else {
      submission.status = 103
      submission.verifikatorStatus = 103
    }

    await submission.save()
  }

  // get submission by submission id
  async getSubmissionBySubmissionId(submissionId: string) {

  }

  // get list submission for approval helpdesk
  async getSubmissionVerificationHelpdesk(submissionTypeId: number) {
    // get submission 
    return await this.submissionRepo.find({
      where: {
        status: 101,
        helpdeskStatus: 100,
        submissionTypeId: submissionTypeId,
        // submissionRequirements: [
        //   {
        //     status: 100
        //   }
        // ]
      }
    }).catch(error => { throw new NotFoundException() })
    // submissionRequirement.status = 102
    // await submissionRequirement.save()
  }

  // get list submission for approval helpdesk
  async getSubmissionVerificationVerifikator(submissionTypeId: number) {
    // get submission 
    return await this.submissionRepo.find({
      // join: 
      where: {
        status: 101,
        helpdeskStatus: 103,
        verifikatorStatus: 100,
        submissionTypeId: submissionTypeId
        // submission: {
        //   submissionTypeId: submissionTypeId,
        //   status: 101
        // }
      }
    }).catch(error => { throw new NotFoundException() })
    // submissionRequirement.status = 102
    // await submissionRequirement.save()
  }

  // get submission requirement
  async getSubmissionRequirement(submissionTypeId: number, submissionId: string) {
    // get submission 
    return await this.submissionRepo.findOne({
      // join: 
      where: {
        submissionTypeId: submissionTypeId,
        id: submissionId
        // submission: {
        //   submissionTypeId: submissionTypeId,
        //   status: 101
        // }
      },
      relations: [
        'submissionRequirements'
      ]
    }).catch(error => { throw new NotFoundException() })
    // submissionRequirement.status = 102
    // await submissionRequirement.save()
  }


  // upload submission requirement
  async uploadSubmissionRequirement(submissionRequirementId: string, file: any) {
    // get submission requirement
    const submissionRequirement = await this.submissionRequirementRepo.findOne({ where: { id: submissionRequirementId } }).catch(error => { throw new NotFoundException() })
    submissionRequirement.file = file
    await submissionRequirement.save()
  }
}
