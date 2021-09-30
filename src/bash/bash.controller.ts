import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Logger,
  Get,
  Query,
} from '@nestjs/common';
import { BashResultDto, BashCommandDto } from './dto';
import { BashService } from './bash.service';
import { ListAllEntitiesInterface } from '../common/interfaces';

@ApiTags('Bash')
@ApiBearerAuth()
@Controller()
export class BashController {
  constructor(private bashService: BashService) {}

  @Post('/run-cmd')
  @ApiOperation({
    summary: 'Run bash command',
  })
  @ApiOkResponse({
    description: 'Successfully run command',
    type: BashResultDto,
  })
  @ApiBadRequestResponse({
    description: 'Command cannot be run',
  })
  @HttpCode(HttpStatus.OK)
  async runCommand(@Body() cmd: BashCommandDto): Promise<BashResultDto> {
    Logger.debug({
      message: `[runBashCommand] Requested to run bash command`,
    });
    return this.bashService.runCommand(cmd);
  }

  @Get('/results')
  @ApiOperation({
    summary: 'Get all results',
  })
  @ApiOkResponse({
    description: 'Successfully returned results',
    type: BashResultDto,
  })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @HttpCode(HttpStatus.OK)
  async getResults(
    @Query() query: ListAllEntitiesInterface,
  ): Promise<BashResultDto[]> {
    Logger.debug({
      message: `[getResults] Requested for results`,
    });
    return this.bashService.getResults(query.limit && +query.limit);
  }
}
