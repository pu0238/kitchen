import { UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { mockAuthService } from "../test/mock.auth.service";
import { LocalStrategy } from "./local.strategy";

describe('LocalStrategy', () => {
    let localStrategy: LocalStrategy;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [LocalStrategy, AuthService],
      })
        .overrideProvider(AuthService)
        .useValue(mockAuthService)
        .compile();
        localStrategy = module.get<LocalStrategy>(LocalStrategy);
    });

    it('should be defined', () => {
        expect(localStrategy).toBeDefined();
    });

    it('should validate user', () => {
        const username = 'username'
        const password = 'password'
        expect(localStrategy.validate(username, password)).resolves.toEqual(expect.any(Object));
    });

    it('should not validate user', () => {
        const username = 'username'
        const password = 'wrongPassword'
        expect(localStrategy.validate(username, password)).rejects.toThrow(UnauthorizedException);
    });
})