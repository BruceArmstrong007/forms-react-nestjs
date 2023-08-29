import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@app/common';
import { UpdateUserRequest } from './dto/request/user.request';
import { User } from './database/model/user.model';
import { CurrentUser } from '@app/common';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async profile(@CurrentUser() user: User) {
    return await this.userService.profile(user?.username);
  }

  @Put('update')
  @UseInterceptors(FileInterceptor('profile'))
  async updateUser(
    @CurrentUser() user: User,
    @Body() request: UpdateUserRequest,
    @UploadedFile() profile: Express.Multer.File,
  ) {
    return await this.userService.updateUser(
      user?.username,
      request,
      profile?.buffer?.toString('base64'),
    );
  }

  @Post('delete')
  async deleteUser(@CurrentUser() user: User) {
    return await this.userService.deleteUser(user?.username);
  }
}
