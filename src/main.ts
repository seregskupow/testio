import { BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import * as session from 'express-session';
import * as passport from 'passport';
import { SEQUELIZE } from './core/constants';
import * as SequelizeConnect from 'connect-session-sequelize';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(5000);
}
bootstrap();
