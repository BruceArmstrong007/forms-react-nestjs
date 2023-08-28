import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        dbName: configService.get<string>('MONGODB_NAME'),
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoDBModule {}