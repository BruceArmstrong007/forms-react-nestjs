import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Form extends Document {
  @Prop({
    required: true,
    maxlength: 25,
  })
  name: string;

  @Prop({ required: true, type: 'object' })
  sections: object;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  authorID: Types.ObjectId;
}
export const FormSchema = SchemaFactory.createForClass(Form);
