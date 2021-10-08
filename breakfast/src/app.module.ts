import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/user.entity';

dotenv.config();
const nodeEnvironment = getEnv('NODE_ENV').toUpperCase();

function getEnv(envName: string): string {
  const value = process.env[envName];
  if (value) {
    return value;
  } else {
    throw `Could not find environment variable: ${envName}`;
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: getEnv(`${nodeEnvironment}_DATABASE_HOST`),
      port: parseInt(getEnv(`${nodeEnvironment}_DATABASE_PORT`)) ?? 3306,
      username: getEnv(`${nodeEnvironment}_DATABASE_USER`),
      password: getEnv(`${nodeEnvironment}_DATABASE_PASSWORD`),
      database: getEnv(`${nodeEnvironment}_DATABASE_NAME`),
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
