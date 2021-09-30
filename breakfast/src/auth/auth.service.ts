import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'Username',
      email: 'Email',
      password: 'Password',
    },
  ];
  private async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  private async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);

    if (user && user.password === password) {
      return user;
    }
  }
  singIn(): string {
    return 'singIn';
  }
  logIn(): string {
    return 'logIn';
  }
  logOut(): string {
    return 'logOut xdcxcxc';
  }
}
