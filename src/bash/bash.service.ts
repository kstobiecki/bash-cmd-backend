import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BashCommandDto, BashResultDto } from './dto';
import { exec } from 'child_process';
import { ErrorMessageEnum } from '../common/enums';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bash, BashDocument } from './schemas/bash.schema';

@Injectable()
export class BashService {
  constructor(@InjectModel(Bash.name) private bashModel: Model<BashDocument>) {}

  public async runCommand({ cmd }: BashCommandDto): Promise<BashResultDto> {
    try {
      const result: string = await this.execCommand(cmd);
      Logger.debug({
        message: `[runCommand] successfully run command ${cmd}`,
      });
      const createdResult = new this.bashModel({ cmd, result });
      return createdResult.save();
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

  public async getResults(limit = 10): Promise<BashResultDto[]> {
    return this.bashModel
      .aggregate([{ $limit: limit }, { $sort: { createdAt: -1 } }])
      .exec();
  }

  private async execCommand(cmd: string): Promise<string> {
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
