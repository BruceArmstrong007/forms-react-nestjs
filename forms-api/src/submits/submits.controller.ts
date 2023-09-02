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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubmitsService } from './submits.service';
import { SubmitsRequest } from './dto/request/submits.request';
import { CurrentUser, JwtAuthGuard } from '@app/common';
import { User } from 'src/user/database/model/user.model';
import { Submit } from './database/model/submits.model';

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
 
  @UseGuards(JwtAuthGuard)
  @Get('responses')
  async getResponses(@CurrentUser() user: User): Promise<Submit[] | null> {
    return await this.submitsService.getResponses(user?.username);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-response/:id')
  async deleteResponse(@Param('id') responseID: string): Promise<object> {
    return await this.submitsService.deleteResponse(responseID);
  }
}
