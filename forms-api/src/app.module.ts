import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from './forms/forms.module';
import { SubmitsModule } from './submits/submits.module';
import { UserModule } from './user/user.module';
import { MongoDBModule } from '@app/common';

@Module({
  imports: [
    MongoDBModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.required(),
        FIREBASE_API_KEY: Joi.string().required(),
        FIREBASE_PROJECT_ID: Joi.string().required(),
        FIREBASE_STORAGE_BUCKET: Joi.string().required(),
        CLIENT_URI1: Joi.string().required(),
        CLIENT_URI2: Joi.string().required(),
      }),
    }),
    AuthModule,
    FormsModule,
    SubmitsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
