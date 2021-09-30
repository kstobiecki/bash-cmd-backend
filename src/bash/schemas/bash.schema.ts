import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BashDocument = Bash & Document;

@Schema()
export class Bash {
  @Prop({ required: true })
  result!: string;
}

export const BashSchema = SchemaFactory.createForClass(Bash);
