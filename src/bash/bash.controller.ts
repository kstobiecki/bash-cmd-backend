import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BashResultDto, BashCommandDto } from './dto';
import { BashService } from './bash.service';

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
  @HttpCode(HttpStatus.OK)
  async runBashCommand(@Body() cmd: BashCommandDto): Promise<BashResultDto> {
    return this.bashService.runCommand(cmd);
  }
}