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
  Get,
} from '@nestjs/common';
import { User } from 'src/user/database/model/user.model';
import { FormsService } from './forms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Form } from './database/model/forms.model';
import { CreateUpdateFormRequest } from './dto/request/forms.request';

@UseGuards(JwtAuthGuard)
@Controller('forms')
export class FormsController {
  constructor(private readonly formService: FormsService) {}

  @Post('save')
  async createUpdateForm(
    @CurrentUser() user: User,
    @Body() request: CreateUpdateFormRequest,
  ): Promise<object> {
    return await this.formService.createUpdateForm(request, user?.username);
  }

  @Get('list')
  async getForms(@CurrentUser() user: User): Promise<Form[] | null> {
    return await this.formService.getForms(user?.username);
  }

  @Delete('delete/:formID')
  async deleteForm(@Param('formID') formID: string) {
    return await this.formService.deleteForm(formID);
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
