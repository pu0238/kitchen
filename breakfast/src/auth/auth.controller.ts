import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInValidator, LogInValidator } from './auth.validator';


@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('singin')
  singIn(@Body() body: SingInValidator): string {
    return this.appService.singIn();
  }

  @Post('login')
  logIn(@Body() body: LogInValidator): string {
    return this.appService.logIn();
  }

  @Post('logout')
  logOut(): string {
    return this.appService.logOut();
  }
  
  @Get('protected')
  protected(): string {
    return 'protected';
  }
}
