import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect username  or password.');
    }
    return user;
  }
}
