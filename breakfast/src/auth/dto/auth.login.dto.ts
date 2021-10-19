import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LogInValidator {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
