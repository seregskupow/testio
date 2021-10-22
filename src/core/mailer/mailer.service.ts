import { Injectable, NotImplementedException } from '@nestjs/common';
import { MailerService as NodeMailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: NodeMailerService) {}

  public async confirmEmail(email: string, confirmCode: string) {
    return this.mailerService
      .sendMail({
        to: email, // list of receivers
        subject: 'Confirm email', // Subject line
        text: 'welcome', // plaintext body
        template: './confirmEmail',
        context: {
          link: confirmCode,
        },
      })
      .catch((e) => {
        console.log(e);
        throw new NotImplementedException('Could not send email');
      });
  }

  public async confirmPasswordChange() {}
}
