import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Qna } from 'src/database/entity/qna.entity';
import { QnaRepository } from 'src/database/repository/qna.repository';
import { ServiceRepository } from 'src/database/repository/service.repository';
import { AnswerDto } from './dto/answer.dto';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QnaService {

  constructor(
    @InjectRepository(QnaRepository) private qnaRepo: QnaRepository,
    @InjectRepository(ServiceRepository) private serviceRepo: ServiceRepository,
  ) { }

  // get question 
  async getQuestionByUserId(userId: string) {
    return this.qnaRepo.find({ where: { createdBy: userId }, relations: ['service'] })
  }

  // get
  async getUnAnsweredQuestion() {
    return this.qnaRepo.find({ where: { answer: null }, relations: ['service'] })
  }

  // create question
  async createQuestion(questionData: QuestionDto) {
     // destruct
     const {
      serviceId,
      question,
      createdBy
    } = questionData

    // get service
    const service = await this.serviceRepo.findOne(serviceId).catch(error => { throw new NotFoundException() })

    const newQuestion = new Qna()
    newQuestion.service = service
    newQuestion.question = question
    newQuestion.createdBy = createdBy
    return await newQuestion.save()
  }

  // answer question
  async answerQuestion(questionId: number, answerData: AnswerDto) {
    // destruct
    const {
      answerBy,
      answer
    } = answerData

    // get question
    const question = await this.qnaRepo.findOne(questionId).catch(error => { throw new NotFoundException() })

    // set question
    question.answer = answer
    question.answerBy = answerBy
    return await question.save()
  }
}
