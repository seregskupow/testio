import {
  ANSWER_REPOSITORY,
  COMPLETED_QUIZ_REPOSITORY,
  QUESTION_REPOSITORY,
  QUIZ_REPOSITORY,
  USER_ANSWERS_REPOSITORY,
} from 'src/core/constants';
import { Answer } from './entities/answer.entity';
import { CompletedQuiz } from './entities/completedQuiz.entity';
import { Question } from './entities/question.entity';
import { Quiz } from './entities/quiz.entity';
import { UserAnswers } from './entities/userAnswers.entity';

export const quizProviders = [
  {
    provide: QUIZ_REPOSITORY,
    useValue: Quiz,
  },
  {
    provide: ANSWER_REPOSITORY,
    useValue: Answer,
  },
  {
    provide: QUESTION_REPOSITORY,
    useValue: Question,
  },
  {
    provide: COMPLETED_QUIZ_REPOSITORY,
    useValue: CompletedQuiz,
  },
  {
    provide: USER_ANSWERS_REPOSITORY,
    useValue: UserAnswers,
  },
];
