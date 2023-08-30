import {
  Body,
  Controller,
  Get,
  Post,
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

  @Get('get-form')
  async getForm(@Query() id: string) {
    return await this.submitsService.getForm(id);
  }

  @Post('send-form')
  async submitForm(@Body() request: SubmitsRequest): Promise<object> {
    await this.submitsService.submitForm(request?.data, request?.authorID);
    return { message: 'Operation Successful.' };
  }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() request: FileRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    // return await this.submitsService.uploadFile(
    //   file.buffer.toString('base64'),
    //   request?.authorID,
    //   request?.name,
    //   request?.type,
    // );

    return '';
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-file')
  async getFile(@Query() id: string): Promise<any> {
    // return await this.submitsService.getFile(id);
    return '';
  }
}
