import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SingInValidator } from './dto';
import { accessToken } from './interfaces/auth.accessToken';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  async getUserByEmailOrUsername(usernameOrEmail: string): Promise<User | undefined> {
    const isEmail = this.validateEmail(usernameOrEmail);

    if (isEmail) {
      const email = usernameOrEmail
      return await this.userService.findOne({ email });
    }
    const username = usernameOrEmail
    return await this.userService.findOne({ username });
  }

  async validateUser(usernameOrEmail: string, passwd: string): Promise<User | null> {
    const user = await this.getUserByEmailOrUsername(usernameOrEmail)

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