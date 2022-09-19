import { Role } from '../../role/role.entity';
import { TokenDto } from './token.dto';
import { User } from '../user.entity';
export class GetUserDto {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  authToken?: TokenDto;

  constructor(user: User, authToken?: TokenDto) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.authToken = authToken;
  }
}
