import { IsNotEmpty } from "class-validator";

export class CreateSubmissionTypeDto {

  @IsNotEmpty()
  name: string

  // @IsNotEmpty()
  description?: string

}