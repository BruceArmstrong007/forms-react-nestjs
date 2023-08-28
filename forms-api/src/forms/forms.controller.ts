import { CurrentUser, JwtAuthGuard } from '@app/common';
import { Controller, Post, UseGuards, Body, Put, Delete } from '@nestjs/common';
import { User } from 'src/user/database/model/user.model';
import { FormsService } from './forms.service';
import {
  CreateFormRequest,
  UpdateFormRequest,
} from './dto/request/forms.request';

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
}
