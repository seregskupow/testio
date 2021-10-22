import { join } from 'path';
import * as dotenv from 'dotenv';
import { INodeMailer } from './interfaces/nodeMailer.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

dotenv.config();

export const nodeMailerConfig: INodeMailer = {
  development: {
    transport: {
      host: process.env.MAILER_HOST,
      service: process.env.MAILER_SERVICE,
      // port: Number.parseInt(process.env.MAILER_PORT),
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    },
    preview: true,
    defaults: {
      from: process.env.MAILER_FROM,
    },
    template: {
      dir: join(process.cwd(), '/src/templates/email'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
    options: {
      partials: {
        dir: join(process.cwd(), '/src/templates/partials/'),
        options: {
          strict: true,
        },
      },
    },
  },
  test: {
    transport: {
      host: process.env.MAILER_HOST,
      service: process.env.MAILER_SERVICE,
      // port: Number.parseInt(process.env.MAILER_PORT),
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    },
    defaults: {
      from: process.env.MAILER_FROM,
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
  production: {
    transport: {
      host: process.env.MAILER_HOST,
      service: process.env.MAILER_SERVICE,
      // port: Number.parseInt(process.env.MAILER_PORT),
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    },
    defaults: {
      from: process.env.MAILER_FROM,
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
};
