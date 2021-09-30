import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BashDocument = Bash & Document;

@Schema()
export class Bash {
  @Prop({ required: true })
  result!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const BashSchema = SchemaFactory.createForClass(Bash);
