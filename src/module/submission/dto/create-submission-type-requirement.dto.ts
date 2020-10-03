import { IsNotEmpty } from "class-validator";

export class CreateSubmissionTypeRequirementDto {

  @IsNotEmpty()
  name: string

  // @IsNotEmpty()
  description?: string

  @IsNotEmpty()
  isRequired: boolean

}