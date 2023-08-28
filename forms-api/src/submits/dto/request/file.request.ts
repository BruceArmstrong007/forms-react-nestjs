import {
  IsNotEmpty,
  IsString,
} from 'class-validator';


export class FileRequest {
  @IsString()
  @IsNotEmpty()
  authorID?: string;

  @IsString()
  @IsNotEmpty()
  name: any;

  @IsString()
  @IsNotEmpty()
  type: any;
}
