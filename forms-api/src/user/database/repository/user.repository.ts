import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { User } from '../model/user.model';

@Injectable()
export class UserRepository {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(@InjectModel(User.name) public readonly userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async userProfile(username: string): Promise<User | null> {
    return await this.userModel
      .findOne({ username })
      .select('-password')
      .exec();
  }

  async createUser(username: string, password: string): Promise<User> {
    const name = 'User-' + uuidv4();
    const newUser = new this.userModel({
      username,
      password,
      name,
    });
    return await newUser.save();
  }

  async updateUser(
    username: string,
    updates: Partial<User>,
  ): Promise<User | null> {
    return await this.userModel
      .findOneAndUpdate({ username: username }, updates, { new: true })
      .exec();
  }

  async deleteUser(username: string): Promise<User | null> {
    return await this.userModel.findOneAndDelete({ username: username }).exec();
  }
}
