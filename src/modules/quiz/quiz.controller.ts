import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/core/guards/authenticated.guard';
import { NotFoundInterceptor } from 'src/core/interceptors/notFound.interceptor';
import { QuizService } from './services/quiz/quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/create')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Request() req) {
    return await this.quizService.create(req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    new NotFoundInterceptor('Quiz id or user id is incorrect'),
  )
  async delete(@Request() req, @Param() params) {
    const deleted = await this.quizService.delete(
      Number(params.id),
      req.user?.id,
    );
    if (!deleted) {
      return null;
    }
    return { message: `Quiz deleted successfully` };
  }
}
