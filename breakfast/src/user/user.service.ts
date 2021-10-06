import { Injectable } from "@nestjs/common";

export type User = {
    id: number;
    username: string;
    email: string;
    password?: string;
  };

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 1,
      username: "Username",
      email: "Email@xd.pl",
      password: "Password",
    },
  ];
  validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  async findOne(
    usernameOrEmail: string,
    isEmail: boolean
  ): Promise<User | undefined> {
    if (isEmail) {
      return this.users.find((user) => user.email === usernameOrEmail);
    }
    return this.users.find((user) => user.username === usernameOrEmail);
  }
}
