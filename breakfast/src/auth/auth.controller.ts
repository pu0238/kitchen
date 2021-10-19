import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInValidator } from './dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { accessToken } from './interfaces/auth.accessToken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('singin')
  singIn(@Body() body: SingInValidator): Promise<accessToken> {
    return this.authService.singIn(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@Request() req): Promise<accessToken> {
    return this.authService.logIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protected(@Request() req): Promise<any> {
    return req.user;
  }
}
