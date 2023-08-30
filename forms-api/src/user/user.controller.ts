import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
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
  async profile(@CurrentUser() user: User): Promise<User | null> {
    return await this.userService.profile(user?.username);
  }

  @Put('update')
  async updateUser(
    @CurrentUser() user: User,
    @Body() request: UpdateUserRequest,
  ): Promise<object> {
    return await this.userService.updateUser(user?.username, request);
  }

  @Post('delete')
  async deleteUser(@CurrentUser() user: User): Promise<object> {
    return await this.userService.deleteUser(user?.username);
  }

  @Put('upload-profile')
  @UseInterceptors(FileInterceptor('profile'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    profile: Express.Multer.File,
    @CurrentUser() user: User,
  ): Promise<object> {
    return await this.userService.profileUpload(user?.username, profile);
  }
}
