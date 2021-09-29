import { Injectable } from '@nestjs/common';
import { BashCommandDto, BashResultDto } from './dto';

@Injectable()
export class BashService {
  async runCommand({ cmd }: BashCommandDto): Promise<BashResultDto> {
    return Promise.resolve({ result: cmd });
  }
}
