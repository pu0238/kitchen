import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { UserService } from './user.service';
@Module({
  imports: [UserModule],
  providers: [UserService],
})
export class UserHttpModule {}