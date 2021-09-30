import { ApiProperty } from '@nestjs/swagger';

export class BashResultDto {
  @ApiProperty()
  _id!: string;

  @ApiProperty()
  cmd!: string;

  @ApiProperty()
  result!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  __v?: number;
}
