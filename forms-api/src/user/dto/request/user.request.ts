import { matchPassword } from '@app/common';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  password: string;
  
  @IsString()
  @IsNotEmpty()    
  @MinLength(8)
  @MaxLength(50)
  @Validate(matchPassword, ['password'])
  confirmPassword: string;
}

export class UpdateUserRequest {  
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name?: string;
}
