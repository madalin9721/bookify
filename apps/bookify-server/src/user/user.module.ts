import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { ApiResponseFactory } from '../security/ApiResponseFactory';
import { JwtStrategy } from '../security/strategy/JwtStrategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [ApiResponseFactory, UserService, JwtStrategy],
})
export class UserModule {}
