import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { plainToClass } from 'class-transformer';
import { RoleEnum } from '../enum/role.enum';
import { ConfigService } from '@nestjs/config';
import { Role } from '../role/role.entity';
import { TokenDto } from './dtos/token.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private static JWT_KEY = 'JWT_SECRET';

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleRepository: Repository<Role>,
    private readonly configService: ConfigService
  ) {}

  async register(dto: RegisterUserDto): Promise<GetUserDto> {
    const createUserDto = new CreateUserDto(
      dto.email,
      dto.password,
      dto.firstName,
      dto.lastName,
      RoleEnum.CLIENT
    );

    return this.save(createUserDto);
  }

  private async save(dto: CreateUserDto): Promise<GetUserDto> {
    const userEntity: User = plainToClass(User, dto);
    userEntity.role = await this.getRole(dto.role);

    const createdUser: User = await this.userRepository.save(userEntity);

    const token = this.createToken(createdUser);

    return new GetUserDto(createdUser, token);
  }

  private async getRole(role: RoleEnum): Promise<Role> {
    const foundRole = await this.roleRepository.findOne({
      where: {
        name: role,
      },
    });

    if (!foundRole) {
      throw new NotFoundException(`Could not find the Role: ${role}`);
    }

    return foundRole;
  }

  private createToken(payload: { email: string; password: string }): TokenDto {
    const expiresIn = 3600 * 24; // seconds (24 hour)
    const expiryDate = new Date().getTime() + expiresIn * 1000;

    const accessToken = jwt.sign(
      { email: payload.email },
      this.configService.get(UserService.JWT_KEY),
      { expiresIn: expiresIn }
    );

    return new TokenDto(accessToken, expiryDate);
  }
}
