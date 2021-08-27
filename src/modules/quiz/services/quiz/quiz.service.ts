import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  QUIZ_DEFAULT_TITLE,
  QUIZ_REPOSITORY,
  USER_ANSWERS_REPOSITORY,
} from 'src/core/constants';
import { User } from 'src/modules/users/entities/user.entity';
import { QuizDto } from '../../dto/quiz.dto';
import { UpdateQuizDto } from '../../dto/updateQuiz.dto';
import { CompletedQuiz } from '../../entities/completedQuiz.entity';
import { Quiz } from '../../entities/quiz.entity';
import { UserAnswers } from '../../entities/userAnswers.entity';

@Injectable()
export class QuizService {
  constructor(
    @Inject(QUIZ_REPOSITORY) private readonly quizRepository: typeof Quiz,
    @Inject(USER_ANSWERS_REPOSITORY)
    private readonly useCompletedQuizRepository: typeof CompletedQuiz,
  ) {}
  async create(userId: number): Promise<QuizDto> {
    return await this.quizRepository
      .create<Quiz>({
        authorId: userId,
        title: QUIZ_DEFAULT_TITLE,
      })
      .then((quiz) => {
        return plainToClass(QuizDto, quiz.get({ plain: true }), {
          ignoreDecorators: true,
        });
      });
  }

  async delete(quizId: number, userId: number): Promise<boolean> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz || quiz['dataValues'].authorId !== userId) return false;
    await quiz.destroy();
    return true;
  }

  async update(
    quizId: number,
    userId: number,
    data: UpdateQuizDto,
  ): Promise<boolean> {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz || quiz['dataValues'].authorId !== userId) return false;
    await quiz.update(data);
    return true;
  }

  async getQuizById(quizId: number): Promise<QuizDto> {
    return await this.quizRepository
      .findOne({ where: { id: quizId } })
      .then((quiz) => {
        return plainToClass(QuizDto, quiz.get({ plain: true }), {
          ignoreDecorators: true,
        });
      });
  }

  async getUserQuizes(userId: number): Promise<QuizDto[]> {
    return await this.quizRepository
      .findAll({ where: { authorId: userId } })
      .then((quizes) => {
        return quizes.map((quiz) =>
          plainToClass(QuizDto, quiz, { ignoreDecorators: true }),
        );
      });
  }

  async getUserCompletedQuizes(userId: number): Promise<QuizDto[]> {
    return await this.quizRepository
      .findAll({
        //attributes: ['right', 'wrong'],
        // where: {
        //   userId: userId,
        // },
        include: {
          model: User,
          where: { id: userId },
        },
      })
      .then((quizes) => {
        return quizes.map((quiz) =>
          plainToClass(QuizDto, quiz, { ignoreDecorators: true }),
        );
      });
  }

  async getCompletedQuizInfo(quizId: number, userId: number) {}
}
