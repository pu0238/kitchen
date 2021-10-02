import { IsString, IsNotEmpty, MinLength, MaxLength} from 'class-validator'

export class LogInValidator {
    @IsNotEmpty()
    @IsString()
    username: string;
  
    @MinLength(6)
    @MaxLength(32)
    @IsNotEmpty()
    @IsString()
    password: string;
  }