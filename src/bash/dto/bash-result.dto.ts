import { ApiProperty } from '@nestjs/swagger';

export class BashResultDto {
  @ApiProperty()
  readonly result!: string;
}
