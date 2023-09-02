import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Submit extends Document {
  @Prop({ required: true, type: [Object], default: null })
  sections: object[];

  @Prop({ required: true, type: Types.ObjectId, ref: 'Form' })
  formID: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  authorID: Types.ObjectId;
}
export const SubmitSchema = SchemaFactory.createForClass(Submit);
