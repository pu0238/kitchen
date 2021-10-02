import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInValidator, LogInValidator } from './dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  singIn(@Body() body: SingInValidator): string{
    return 'singIn';
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Body() body: LogInValidator): Promise<any> {
    return await this.authService.logIn(body);
  }

  @Post('logout')
  logOut(): string {
    return this.authService.logOut();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protected(): string {
    return 'protected';
  }
}
