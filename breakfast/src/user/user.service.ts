import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: any): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  s(): Promise<any> {
    const user: any = {username: "sdsd2", email:"ddddd2", password:"sdsdddd3"}
    return this.usersRepository.insert(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}