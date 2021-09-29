import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BashModule } from './bash/bash.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/bash-cmd'), BashModule],
})
export class AppModule {}
