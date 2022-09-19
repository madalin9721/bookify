import { RegisterUserDto } from './register-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../enum/role.enum';

export class CreateUserDto extends RegisterUserDto {
  @IsNotEmpty()
  @ApiProperty()
  role: RoleEnum;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: RoleEnum
  ) {
    super(email, password, firstName, lastName);
    this.role = role;
  }
}
