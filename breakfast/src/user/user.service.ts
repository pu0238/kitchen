import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
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

  findOne(arg: any): Promise<User> {
    return this.usersRepository.findOne(arg);
  }

  insert(user: User): Promise<InsertResult> {
    return this.usersRepository.insert(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}