import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env'}), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
