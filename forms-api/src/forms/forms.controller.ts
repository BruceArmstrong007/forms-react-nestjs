import { CurrentUser, JwtAuthGuard } from '@app/common';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Param,
} from '@nestjs/common';
import { User } from 'src/user/database/model/user.model';
import { FormsService } from './forms.service';
import {
  CreateFormRequest,
  DeleteFileRequest,
  UpdateFormRequest,
} from './dto/request/forms.request';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('forms')
export class FormsController {
  constructor(private readonly formService: FormsService) {}

  @Post('create')
  async createForm(
    @CurrentUser() user: User,
    @Body() request: CreateFormRequest,
  ) {
    return await this.formService.createForm(
      request?.name,
      request?.fields,
      user?._id,
    );
  }

  @Put('update')
  async updateForm(
    @CurrentUser() user: User,
    @Body() request: UpdateFormRequest,
  ) {
    return await this.formService.updateForm(request);
  }

  @Delete('delete')
  async deleteForm(@Body() request: UpdateFormRequest) {
    return await this.formService.deleteForm(request?._id);
  }

  @Put('image-upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<object> {
    return await this.formService.uploadFile(file);
  }

  @Put('video-upload')
  @UseInterceptors(FileInterceptor('file'))
  async videoUpload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'video/mp4' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<object> {
    return await this.formService.uploadFile(file);
  }

  @Delete('delete-file/:name')
  async deleteFile(@Param('name') fileName: string): Promise<object> {
    return await this.formService.deleteFile(fileName);
  }
}
