import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { quizProviders } from './quiz.providers';
import { QuizService } from './services/quiz/quiz.service';

@Module({
  controllers: [QuizController],
  providers: [QuizService, ...quizProviders],
})
export class QuizModule {}
