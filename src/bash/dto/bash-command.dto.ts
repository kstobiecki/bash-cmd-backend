import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BashCommandDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly cmd!: string;
}
