import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import {
  CreateUserRequest,
  UpdateUserRequest,
} from './dto/request/user.request';
import { User } from './database/model/user.model';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './database/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);
    await this.userRepository.createUser(
      request?.username,
      await bcrypt.hash(request?.password, 10),
    );
    return {
      message: 'User Created.',
    };
  }

  async resetPassword(username: string, request: CreateUserRequest) {
    await this.userRepository.updateUser(username, {
      password: await bcrypt.hash(request?.password, 10),
    });
    return {
      message: 'Password Updated.',
    };
  }

  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.userRepository.findByUsername(request?.username);
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('User already exists.');
    }
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async profile(username: string) {
    return await this.userRepository.userProfile(username);
  }

  async updateUser(username: string, fields: UpdateUserRequest, file?: string) {
    const result = await {
      ...fields,
      profile: file,
    };
    await this.userRepository.updateUser(username, result);
    return {
      message: 'User Details Updated.',
    };
  }

  async deleteUser(username: string) {
    await this.userRepository.deleteUser(username);
    return {
      message: 'User Deleted.',
    };
  }
}
