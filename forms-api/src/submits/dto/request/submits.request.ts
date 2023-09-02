import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SubmitsRequest {
  @IsString()
  @IsNotEmpty()
  authorID?: string;

  @IsString()
  @IsNotEmpty()
  formID?: string;

  @IsNotEmpty()
  @IsArray()
  sections: any;
}
