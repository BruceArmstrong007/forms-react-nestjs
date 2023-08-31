import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateFormRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @IsObject()
  @IsNotEmpty()
  fields: FormData[];
}

export class UpdateFormRequest {
  @IsString()
  _id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  name?: string;

  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  fields: FormData[];
}

