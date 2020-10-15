import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { AnswerDto } from './dto/answer.dto';
import { QnaService } from './qna.service';

@Controller('qna')
export class QnaController {

  constructor(private qnaService: QnaService) { }


  // get question by user id
  @Get('/user/:userId')
  async getQuestionByUserId(@Param('userId') userId: string) {
    return this.qnaService.getQuestionByUserId(userId)
  }

  // get question not answered
  @Get()
  async getUnAnsweredQuestion() {
    return this.qnaService.getUnAnsweredQuestion()
  }

  // create question
  @Post()
  async createQuestion(@Body() question: QuestionDto) {
    return this.qnaService.createQuestion(question)
  }

  // answer question
  @Put('/:questionId')
  async answerQuestion(@Body() answer: AnswerDto, @Param('questionId') questionId: number) {
    return this.qnaService.answerQuestion(questionId, answer)
  }

}
