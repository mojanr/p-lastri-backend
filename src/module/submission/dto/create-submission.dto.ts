import { IsNotEmpty } from "class-validator";

export class CreateSubmissionDto {

  @IsNotEmpty()
  createdBy: string

  @IsNotEmpty()
  submissionTypeId: number

}