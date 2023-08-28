import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ versionKey: false, timestamps: true })
export class Submit extends Document {

  @Prop({ required: true, default: null })
  data: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  authorID: Types.ObjectId;
}
export const SubmitSchema = SchemaFactory.createForClass(Submit);
