import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class File extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  buffer: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  authorID: Types.ObjectId;
}
export const FileSchema = SchemaFactory.createForClass(File);
