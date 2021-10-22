import { MailerOptions } from '@nestjs-modules/mailer';
export interface INodeMailer {
  development: MailerOptions;
  test: MailerOptions;
  production: MailerOptions;
}
