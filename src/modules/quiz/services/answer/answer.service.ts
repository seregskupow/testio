import { Inject, Injectable } from '@nestjs/common';
import {
  ANSWER_REPOSITORY,
  QUIZ_REPOSITORY,
  USER_ANSWERS_REPOSITORY,
  USER_REPOSITORY,
} from 'src/core/constants';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { Answer } from '../../entities/answer.entity';
import { CompletedQuiz } from '../../entities/completedQuiz.entity';
import { Quiz } from '../../entities/quiz.entity';
import { UserAnswers } from '../../entities/userAnswers.entity';

@Injectable()
export class AnswerService {
  constructor(
    @Inject(ANSWER_REPOSITORY) private readonly answerRepository: typeof Answer,
    @Inject(USER_ANSWERS_REPOSITORY)
    private readonly userAnswersRepository: typeof UserAnswers,
    @Inject(QUIZ_REPOSITORY) private readonly quizRepository: typeof Quiz,
    private readonly usersService: UsersService,
  ) {}

  async answer(
    userId: number,
    answerId: number,
    value: string,
  ): Promise<boolean> {
    const doesUserExist = this.usersService.findOneById(userId);
    if (!doesUserExist) return false;
    const doesAnswerExist = this.answerRepository.findOne({
      where: { id: answerId },
    });
    if (!doesAnswerExist) return false;

    await this.userAnswersRepository.create({
      userId,
      answerId,
      value,
    });
    return true;
  }

  async countCorrectAnswers(userId: number, quizId: number): Promise<number> {
    const doesUserExist = this.usersService.findOneById(userId);
    if (!doesUserExist) return null;
    const doesQuizExist = this.quizRepository.findOne({
      where: { id: quizId },
    });
    if (!doesQuizExist) return null;
    const count = this.userAnswersRepository.count({
      where: { userId },
      include: [
        {
          model: Answer,
          where: { quizId, correct: true },
        },
        {
          model: Answer,
          where: { quizId, correct: false },
        },
      ],
    });
    return 1;
  }
}
