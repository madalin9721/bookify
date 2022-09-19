import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ApiResponseFactory } from '../security/ApiResponseFactory';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly apiResponseFactory: ApiResponseFactory,
    private readonly userService: UserService
  ) {}

  @Post('/register')
  async register(@Body() dto: RegisterUserDto, @Res() response: Response) {
    const createdUser = await this.userService.register(dto);
    return this.apiResponseFactory.success(
      createdUser,
      'User successfully registered',
      response
    );
  }
}
