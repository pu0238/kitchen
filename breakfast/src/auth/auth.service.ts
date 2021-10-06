import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from 'src/user/user.service';
import { SingInValidator } from './dto';
import { accessToken } from './interfaces/auth.accessToken';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(usernameOrEmail: string, passwd: string): Promise<User | null> {
    const isEmail = this.userService.validateEmail(usernameOrEmail);
    const user = await this.userService.findOne(usernameOrEmail, isEmail);

    if (user && user.password === passwd) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async singIn(body: SingInValidator): Promise<string> {
    return 'singIn';
  }
  async logIn(user: any): Promise<accessToken>  {
    const payload = { username: user.username, id: user.id  };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}