import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard } from 'src/core/guards/authenticated.guard';
import { NotFoundInterceptor } from 'src/core/interceptors/notFound.interceptor';

import { UpdateQuizDto } from '../../dto/updateQuiz.dto';
import { QuizService } from '../../services/quiz/quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/create')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Req() req) {
    return await this.quizService.create(req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    new NotFoundInterceptor('Quiz id or user id is incorrect'),
  )
  async delete(@Req() req, @Param() params) {
    const deleted = await this.quizService.delete(
      Number(params.id),
      req.user?.id,
    );
    if (!deleted) {
      return null;
    }
    return { message: `Quiz id:${params.id} was deleted successfully` };
  }

  @Put('/update')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    new NotFoundInterceptor('Cannot find such Quiz entity'),
  )
  async update(@Req() req, @Body() body: UpdateQuizDto) {
    const updated = await this.quizService.update(req.user.id, body);
    if (!updated) {
      return null;
    }
    return { message: `Quiz updated successfully` };
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    new NotFoundInterceptor('Cannot find such Quiz entity'),
  )
  async getById(@Param() params) {
    return await this.quizService.getQuizById(Number(params.id));
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    new NotFoundInterceptor('Cannot find such Quiz entity'),
  )
  async getUserQuizes(@Param() params) {
    return await this.quizService.getUserQuizes(Number(params.id));
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    ClassSerializerInterceptor,
    new NotFoundInterceptor('Cannot find such Quiz entity'),
  )
  async getUserCompletedQuizes(@Param() params) {
    return await this.quizService.getUserCompletedQuizes(Number(params.id));
  }
}
