import { Module } from '@nestjs/common';
import { BashController } from './bash.controller';
import { BashService } from './bash.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bash, BashSchema } from './schemas/bash.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bash.name, schema: BashSchema }]),
  ],
  providers: [BashService],
  controllers: [BashController],
})
export class BashModule {}
