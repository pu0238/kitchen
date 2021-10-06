import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInValidator } from './dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  async singIn(@Body() body: SingInValidator): Promise<any> {
    return await this.authService.singIn(body);
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Request() req): Promise<any> {
    return await this.authService.logIn(req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protected(@Request() req): Promise<any> {
    return req.user;
  }
}
