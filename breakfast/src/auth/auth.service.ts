import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LogInValidator } from './dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(usernameOrEmail: string, passwd: string): Promise<any> {
    const isEmail = this.userService.validateEmail(usernameOrEmail);
    const user = await this.userService.findOne(usernameOrEmail, isEmail);

    if (user && user.password === passwd) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  singIn(): string {
    return 'singIn';
  }
  async logIn(body: LogInValidator): Promise<any>  {
    const payload = { username: body.username, sub: body.password };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  logOut(): string {
    return 'logOut';
  }
}
