import { IsNotEmpty } from "class-validator";

export class RejectDto {

  // @IsNotEmpty()
  // createdBy: string

  @IsNotEmpty()
  reason: string

}