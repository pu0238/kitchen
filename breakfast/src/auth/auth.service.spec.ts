import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { mockJwtService } from './test/mock.jwt.service';
import { mockUserService } from './test/mock.user.service';

describe('AuthService', () => {
  let authService: AuthService;

  const user: User = {
    id: 1,
    username: 'username',
    email: 'email@email.email',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [AuthService, UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should validate not email', () => {
    const notEmail = 'email';
    expect(authService.validateEmail(notEmail)).toEqual(false);
  });

  it('should validate not email with @', () => {
    const emailWithMonkeySign = 'email@email';
    expect(authService.validateEmail(emailWithMonkeySign)).toEqual(false);
  });

  it('should validate true email', () => {
    const emailWithMonkeySignDotDomain = 'email@email.email';
    expect(authService.validateEmail(emailWithMonkeySignDotDomain)).toEqual(
      true,
    );
  });

  it('should get user by email', () => {
    const usernameOrEmail = 'email@email.email';
    expect(
      authService.getUserByEmailOrUsername(usernameOrEmail),
    ).resolves.toEqual(expect.any(Object));
  });

  it('should get user by username', () => {
    const usernameOrEmail = 'username';
    expect(
      authService.getUserByEmailOrUsername(usernameOrEmail),
    ).resolves.toEqual(expect.any(Object));
  });

  it('should logIn', () => {
    expect(authService.logIn(user)).resolves.toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should return conflict', () => {
    const userBody = {
      username: 'username',
      email: 'email@email.email',
      password: 'password',
    };
    expect(authService.singIn(userBody)).rejects.toThrow(ConflictException);
  });

  it('should singIn', () => {
    const userBody = {
      username: 'newusername',
      email: 'newemail@email.email',
      password: 'password',
    };
    expect(authService.singIn(userBody)).resolves.toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should validate user', () => {
    const username = 'username'
    const password = 'password'
    expect(authService.validateUser(username, password)).resolves.toEqual(expect.any(Object));
  });

  it('should not validate user', () => {
    const username = 'newusername'
    const password = 'password'
    expect(authService.validateUser(username, password)).resolves.toEqual(null);
  });

  it('should not validate user', () => {
    const email = 'newemail@email.email'
    const password = 'password'
    expect(authService.validateUser(email, password)).resolves.toEqual(null);
  });
});
