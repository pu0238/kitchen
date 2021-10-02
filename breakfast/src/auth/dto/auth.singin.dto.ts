import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength} from 'class-validator'

export class SingInValidator {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  password: string;
}