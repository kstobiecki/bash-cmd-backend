import { ApiProperty } from '@nestjs/swagger';

export class BashResultDto {
  @ApiProperty()
  result!: string;
}
