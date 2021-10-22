import { Module } from '@nestjs/common';
import { MailerModule as NodeMailerModule } from '@nestjs-modules/mailer';
import { nodeMailerConfig } from './mailer.config';
import { DEVELOPMENT, PRODUCTION, TEST } from '../constants';
import { MailService } from './mailer.service';

@Module({
  imports: [
    NodeMailerModule.forRootAsync({
      useFactory: () => {
        let config;
        switch (process.env.NODE_ENV) {
          case DEVELOPMENT:
            config = nodeMailerConfig.development;
            break;
          case TEST:
            config = nodeMailerConfig.test;
            break;
          case PRODUCTION:
            config = nodeMailerConfig.production;
            break;
          default:
            config = nodeMailerConfig.development;
        }
        return config;
      },
    }),
  ],
  exports: [NodeMailerModule, MailService],
  providers: [MailService],
})
export class MailerModule {}
