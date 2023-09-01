import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUpdateFormRequest {
  @IsArray()
  @IsNotEmpty()
  sections: string;

  @IsString()
  @MaxLength(25)
  name: string;

  @IsOptional()
  @IsString()
  _id?: string;
}

export class DeleteFormRequest {
  @IsString()
  _id?: string;
}
