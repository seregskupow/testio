import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './utils/serialize';
import { ImgUploadModule } from 'src/core/img-upload/img-upload.module';

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: 'local' }),
    UsersModule,
    ImgUploadModule,
  ],
  providers: [AuthService, LocalStrategy, GoogleStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
