import { Module } from '@nestjs/common';
import { BashController } from './bash.controller';
import { BashService } from './bash.service';

@Module({
  providers: [BashService],
  controllers: [BashController],
})
export class BashModule {}
