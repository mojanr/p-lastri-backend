import { IsNotEmpty } from "class-validator";

export class QuestionDto {

  @IsNotEmpty()
  serviceId: number

  @IsNotEmpty()
  createdBy: string

  @IsNotEmpty()
  question: string

}