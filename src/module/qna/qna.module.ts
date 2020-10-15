import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QnaRepository } from 'src/database/repository/qna.repository';
import { ServiceRepository } from 'src/database/repository/service.repository';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QnaRepository, ServiceRepository])
  ],
  controllers: [QnaController],
  providers: [QnaService]
})
export class QnaModule {}
