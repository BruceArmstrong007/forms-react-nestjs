import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubmitsService } from './submits.service';
import { SubmitsRequest } from './dto/request/submits.request';
import { JwtAuthGuard } from '@app/common';
import { FileRequest } from './dto/request/file.request';

@Controller('submits')
export class SubmitsController {
  constructor(private readonly submitsService: SubmitsService) {}

  @Get('get-form/:id')
  async getForm(@Param('id') id: string) {
    return await this.submitsService.getForm(id);
  }

  @Post('submit-form')
  async submitForm(@Body() request: SubmitsRequest): Promise<object> {
    await this.submitsService.submitForm(
      request?.sections,
      request?.authorID,
      request?.formID,
    );
    return { message: 'Operation Successful.' };
  }

  @Put('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async videoUpload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<object> {
    return await this.submitsService.uploadFile(file);
  }

  @Delete('delete-file/:name')
  async deleteFile(@Param('name') fileName: string): Promise<object> {
    return await this.submitsService.deleteFile(fileName);
  }
}
