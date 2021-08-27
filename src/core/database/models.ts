import { Answer } from 'src/modules/quiz/entities/answer.entity';
import { CompletedQuiz } from 'src/modules/quiz/entities/completedQuiz.entity';
import { Question } from 'src/modules/quiz/entities/question.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { UserAnswers } from 'src/modules/quiz/entities/userAnswers.entity';
import { User } from 'src/modules/users/entities/user.entity';

export const models = [
  User,
  Quiz,
  Question,
  Answer,
  CompletedQuiz,
  UserAnswers,
];
