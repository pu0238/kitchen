import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('auth service should work', () => {
    /*
    it('should return "logIn"', () => {
      expect(controller.logIn()).toBe('logIn');
    });
    it('should return "logOut"', () => {
      expect(controller.logOut()).toBe('logOut');
    });
    it('should return "singIn"', () => {
      expect(controller.singIn()).toBe('singIn');
    });*/
  });
});
