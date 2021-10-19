import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { mockAuthService } from './test/mock.auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sing in', () => {
    expect(
      controller.singIn({
        username: 'username',
        email: 'email@email.email',
        password: 'password',
      }),
    ).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should log in using email', () => {
    expect(
      controller.logIn({
        username: 'email@email.email',
        password: 'password',
      }),
    ).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should log in using username', () => {
    expect(
      controller.logIn({
        username: 'username',
        password: 'password',
      }),
    ).toEqual({
      accessToken: expect.any(String),
    });
  });
});
