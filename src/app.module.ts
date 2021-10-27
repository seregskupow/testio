import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { ImgUploadModule } from './core/img-upload/img-upload.module';
import { MailerModule } from './core/mailer/mailer.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GlobalModule } from './core/globalModules/global.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalModule,
    UsersModule,
    AuthModule,
    QuizModule,
    ImgUploadModule,
    MailerModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
