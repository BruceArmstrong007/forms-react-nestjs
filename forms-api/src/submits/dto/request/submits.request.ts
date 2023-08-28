import {
  IsNotEmpty,
  IsString,
} from 'class-validator';


export class SubmitsRequest {
  @IsString()
  @IsNotEmpty()
  authorID?: string;

  @IsNotEmpty()
  data: any;
}
