import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dtos/user-login-dto';
import { UserDto } from './dtos/user-dto';
import { UserLoggedDto } from './dtos/user-logged-dto';
import { JwtLoginDto } from './dtos/jwt-login-dto';

@Injectable()
export class AuthService {
  constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<UserLoggedDto> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result }: UserDto = user;
      return result;
    }
    return null;
  }

  async login(user: UserLoggedDto): Promise<JwtLoginDto> {
    const jwtLogin = new JwtLoginDto;
    jwtLogin.access_token = this.jwtService.sign(user);
    return jwtLogin;
  }
}