import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { mockJwtService } from './test/mock.jwt.service';
import { mockUserService } from './test/mock.user.service';
import { user } from './test/user.template';

describe('AuthService', () => {
  let authService: AuthService;

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

  it('should not validate email', () => {
    const notEmail = 'email';
    expect(authService.validateEmail(notEmail)).toEqual(false);
  });

  it('should not validate email with @', () => {
    const emailWithMonkeySign = 'email@email';
    expect(authService.validateEmail(emailWithMonkeySign)).toEqual(false);
  });

  it('should validate email', () => {
    const emailWithMonkeySignDotDomain = 'email@email.email';
    expect(authService.validateEmail(emailWithMonkeySignDotDomain)).toEqual(
      true,
    );
  });

  it('should salt password', () => {
    const password = 'password';
    expect(authService.saltPassword(password, 'salt')).toEqual(
      expect.any(String),
    );
  });

  it('should salt password', () => {
    const password = 'password';
    expect(authService.saltAndHash(password, 'salt')).toEqual(
      expect.any(String),
    );
  });

  it('should not validate password', () => {
    const password = 'password';
    expect(authService.validatePassword(password)).toEqual(false);
  });

  it('should validate password', () => {
    const password = 'P@ssw0rd';
    expect(authService.validatePassword(password)).toEqual(true);
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
      password: 'P@ssw0rd',
    };
    expect(authService.singIn(userBody)).rejects.toThrow(ConflictException);
  });

  it('should return conflict', () => {
    const userBody = {
      username: 'newusername',
      email: 'newemail@email.email',
      password: 'pasword',
    };
    expect(authService.singIn(userBody)).rejects.toThrow(ConflictException);
  });

  it('should singIn', () => {
    const userBody = {
      username: 'newusername',
      email: 'newemail@email.email',
      password: 'P@ssw0rd',
    };
    expect(authService.singIn(userBody)).resolves.toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should validate user', () => {
    const username = 'username';
    const password = 'P@ssw0rd';
    expect(authService.validateUser(username, password)).resolves.toEqual(
      expect.any(Object),
    );
  });

  it('should not validate user', () => {
    const username = 'newusername';
    const password = 'P@ssw0rd';
    expect(authService.validateUser(username, password)).resolves.toEqual(null);
  });

  it('should not validate user', () => {
    const email = 'newemail@email.email';
    const password = 'P@ssw0rd';
    expect(authService.validateUser(email, password)).resolves.toEqual(null);
  });
});
