import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class FormData extends Document {
  @Prop({ required: true, maxlength: 500 })
  title: string;

  @Prop({
    required: true,
    maxlength: 50,
  })
  type: string;

  @Prop({ default: false })
  required: boolean;

  @Prop({ default: null })
  extra: string;
}

const FormDataSchema = SchemaFactory.createForClass(FormData);

@Schema({ versionKey: false, timestamps: true })
export class Form extends Document {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    maxlength: 25,
  })
  name: string;

  @Prop({ required: true, type: [FormDataSchema], default: null })
  fields: FormData[];

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  authorID: Types.ObjectId;
}
export const FormSchema = SchemaFactory.createForClass(Form);
