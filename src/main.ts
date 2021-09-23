import { BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import * as session from 'express-session';
import * as passport from 'passport';
import { SEQUELIZE } from './core/constants';
import * as SequelizeConnect from 'connect-session-sequelize';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //global prefix
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidateInputPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  const SequelizeStore = SequelizeConnect(session.Store);
  const sequelize = app.get(SEQUELIZE);
  const mystore = new SequelizeStore({
    db: sequelize,
  });
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: mystore,
    }),
  );
  mystore.sync();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(morgan('tiny'));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(5000);
}
bootstrap();
