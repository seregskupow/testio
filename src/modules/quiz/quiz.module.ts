import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz/quiz.controller';
import { quizProviders } from './quiz.providers';
import { QuizService } from './services/quiz/quiz.service';
import { AnswerController } from './controllers/answer/answer.controller';
import { AnswerService } from './services/answer/answer.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [QuizController, AnswerController],
  providers: [QuizService, ...quizProviders, AnswerService],
  imports: [UsersModule],
})
export class QuizModule {}
