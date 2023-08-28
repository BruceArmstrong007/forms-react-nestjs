import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 25,
  })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ maxlength: 50 })
  name: string;

  @Prop()
  profileURL: string;

}
export const UserSchema = SchemaFactory.createForClass(User);
