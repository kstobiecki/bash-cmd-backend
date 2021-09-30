import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BashModule } from './bash/bash.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
        directConnection: true,
        serverSelectionTimeoutMS: 2000,
      }),
      inject: [ConfigService],
    }),
    BashModule,
  ],
})
export class AppModule {}
