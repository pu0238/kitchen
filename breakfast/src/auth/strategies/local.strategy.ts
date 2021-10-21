import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(usernameOrEmail: string, password: string): Promise<any> {
    if (!this.authService.validatePassword(password))
      throw new ConflictException('Password does not contain a number or a special character')

    const user = await this.authService.validateUser(usernameOrEmail, password);
    if (!user)
      throw new UnauthorizedException('Incorrect login or password');
    return user;
  }
}