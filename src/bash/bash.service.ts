import {
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { BashCommandDto, BashResultDto } from './dto';
import { exec } from 'child_process';
import { ErrorMessageEnum } from '../enums/error-message.enum';

@Injectable()
export class BashService {
  async runCommand({ cmd }: BashCommandDto): Promise<BashResultDto> {
    try {
      const result: string = await this.execCommand(cmd);
      Logger.debug({
        message: `[runCommand] successfully run command ${cmd}`,
      });

      return { result };
    } catch (errorMessage) {
      Logger.debug({
        message: `[runCommand] command ${cmd} cannot be run and throws following error ${errorMessage}`,
      });
      throw new BadRequestException({
        message: errorMessage,
        error: ErrorMessageEnum.WRONG_COMMAND,
      });
    }
  }

  async execCommand(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
}
