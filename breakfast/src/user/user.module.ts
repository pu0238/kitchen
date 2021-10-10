import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserSchema])],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}



