import { Body, Controller, Get, Param, Patch, Post, Put, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { CreateSubmissionTypeRequirementDto } from './dto/create-submission-type-requirement.dto';
import { CreateSubmissionTypeDto } from './dto/create-submission-type.dto';
import { SubmissionService } from './submission.service';
import * as multer from 'multer'
import * as mime from 'mime-types'
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { RejectDto } from './dto/reject.dto';

@Controller('submission')
export class SubmissionController {

  constructor(private submissionService: SubmissionService) { }

  // get all submission type
  @Get('/type')
  async getSubmissionTypes() {
    return this.submissionService.getSubmissionTypes()
  }

  // create submission type
  @Post('/type')
  async createSubmissionType(@Body() newSubmissionType: CreateSubmissionTypeDto) {
    return this.submissionService.createSubmissionType(newSubmissionType)
  }

  // get all submission type requirement
  @Get('/type/:submissionTypeId/requirement')
  async getSubmissionTypeRequirements(@Param('submissionTypeId') submissionTypeId: number) {
    return this.submissionService.getSubmissionTypeRequirementBySubmissionTypeId(submissionTypeId)
  }

  // add submission type requirement
  @Post('/type/:submissionTypeId/requirement')
  @UseInterceptors(FileInterceptor('template', {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './storage/template')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
      }
    }),
    dest: '/storage/template'
  }))
  async createSubmissoinTypeRequirement(
    @Param('submissionTypeId') submissionTypeId: number,
    @Body() newSubmissionTypeRequirement: CreateSubmissionTypeRequirementDto,
    @UploadedFile() file
  ) {
    console.log(submissionTypeId, newSubmissionTypeRequirement, file)
    // return submissionTypeId
    // destruct
    const {
      name,
      description,
      isRequired
    } = newSubmissionTypeRequirement

    return this.submissionService.createSubmissionTypeRequirementBySubmissionTypeId(submissionTypeId, {
      name: name,
      description: description,
      isRequired: isRequired,
      template: file?.filename
    })
  }

  // get file submission type requirement
  @Get('/storage/template/:templateName')
  async getFileSubmissionTypeRequirement(@Param('templateName') templateName: string, @Res() res) {
    // res.setHeader('Content-disposition', 'inline; filename="' + templateName + '"');
    // res.setHeader('Content-type', 'application/pdf');
    return res.sendFile(templateName, {
      root: './storage/template',
      // headers: {
      //   'Content-type': 'application/pdf',
      //   'Content-disposition': 'inline; filename="' + templateName + '"'
      // }
    });
  }

  // get file submission requirement
  @Get('/storage/submission/:templateName')
  async getFileSubmissionRequirement(@Param('templateName') templateName: string, @Res() res) {
    // res.setHeader('Content-type', 'application/pdf');
    return res.sendFile(templateName, { root: './storage/submission' });
  }
  
  // create submission
  @Post()
  async createSubmission(@Body() newSubmission: CreateSubmissionDto) {
    // destruct
    const {
      createdBy,
      submissionTypeId
    } = newSubmission
    return this.submissionService.createSubmission(submissionTypeId, createdBy)
  }

  // submit submission
  @Patch('/:submissionId/submit')
  async submitSubmission(@Param('submissionId') submissionId: string) {
    return this.submissionService.submitSubmission(submissionId)
  }

  // cancel submission
  @Patch('/:submissionId/cancel')
  async cancelSubmission(@Param('submissionId') submissionId: string) {
    return this.submissionService.cancelSubmission(submissionId)
  }

  // submit approval
  @Patch('/:submissionApproval')
  async submitApproval() {

  }

  // get approval list verifikator
  @Get('/:submissionTypeId/verification/verifikator') 
  async getSubmissionVerificationVerifikator(@Param('submissionTypeId') submissionTypeId: number) {
    return this.submissionService.getSubmissionVerificationVerifikator(submissionTypeId)
  }

  // get submission requirement
  @Get('/:submissionTypeId/requirement/:submissionId') 
  async getSubmissionRequirement(@Param('submissionTypeId') submissionTypeId: number, @Param('submissionId') submissionId: string) {
    return this.submissionService.getSubmissionRequirement(submissionTypeId, submissionId)
  }

  // get approval list helpdesk
  @Get('/:submissionTypeId/verification/helpdesk') 
  async getSubmissionVerificationHelpdesk(@Param('submissionTypeId') submissionTypeId: number) {
    return this.submissionService.getSubmissionVerificationHelpdesk(submissionTypeId)
  }

  // get active submission
  @Get('/:submissionTypeId/:createdBy/active')
  async getActiveSubmission(@Param('submissionTypeId') submissionTypeId: number, @Param('createdBy') createdBy: string) {
    return this.submissionService.getActiveSubmission(submissionTypeId, createdBy)
  }

  // post upload submission file
  @Post('/requirement/:submissionRequirementId')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './storage/submission')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
      }
    }),
    dest: '/storage/submission'
  }))
  async uploadSubmissionRequirement(
    @Param('submissionRequirementId') submissionRequirementId: string,
    // @Body() newSubmissionTypeRequirement: CreateSubmissionTypeRequirementDto,
    @UploadedFile() file
  ) {
    console.log(submissionRequirementId, file)
    return this.submissionService.uploadSubmissionRequirement(submissionRequirementId, file?.filename)
    // check if has upload file
    // if has upload file
    // delete then upload new one
  }

  // approve uploaded submission requirement
  @Patch('/requirement/:submissionRequirementId/approve')
  async approveUploadedSubmissionRequirement(@Param('submissionRequirementId') submissionRequirementId: string) {
    return this.submissionService.approveSubmissionRequirement(submissionRequirementId)
  }

  // reject uploaded submission requirement
  @Patch('/requirement/:submissionRequirementId/reject')
  async rejectUploadedSubmissionRequirement(@Param('submissionRequirementId') submissionRequirementId: string, @Body() rejectData: RejectDto) {
    return this.submissionService.rejectSubmissionRequirement(submissionRequirementId, rejectData.reason)
  }

  // submit approval helpdesk
  @Patch('/submit/approval/helpdesk/:submissionId')
  async submitApprovalHelpdesk(@Param('submissionId') submissionId: string) {
    return this.submissionService.submitApprovalHelpdesk(submissionId)
  }

  // submit approval verifikator
  @Patch('/submit/approval/verifikator/:submissionId')
  async submitApprovalVerifikator(@Param('submissionId') submissionId: string) {
    return this.submissionService.submitApprovalVerifikator(submissionId)
  }

}

