import { IsNotEmpty } from "class-validator";

export class AnswerDto {

  // @IsNotEmpty()
  // serviceId: number

  @IsNotEmpty()
  answerBy: string

  @IsNotEmpty()
  answer: string

}