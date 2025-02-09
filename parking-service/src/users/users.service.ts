import { Injectable } from '@nestjs/common';
import { UserDto } from '../auth/dtos/user-dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.users.find(user => user.username === username);
  }
}