import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy"
import { UserModule } from "src/user/user.module";
import { JwtStrategy } from "./strategies/jwt.stretegy";
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from "@nestjs/config";
dotenv.config();
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: "60s" }
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, ConfigService, JwtStrategy],
})
export class AuthModule {}
