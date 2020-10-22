import { IsNotEmpty } from "class-validator";

export class SubmitApprovalDto {

  // @IsNotEmpty()
  // createdBy: string

  @IsNotEmpty()
  comment: string

}