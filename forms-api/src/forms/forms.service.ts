import { Injectable } from '@nestjs/common';
import { FormsRepository } from './database/repository/forms.repository';
import { Form } from './database/model/forms.model';
import { CreateUpdateFormRequest } from './dto/request/forms.request';

@Injectable()
export class FormsService {
  constructor(private readonly formsRepository: FormsRepository) {}

  async getForms(username: string): Promise<Form[] | null> {
    return await this.formsRepository.findByAuthorUsername(username);
  }

  async createUpdateForm(
    data: CreateUpdateFormRequest,
    username: string,
  ): Promise<object> {
    const form = {
      name: data?.name,
      sections: data?.sections,
      authorID: await this.formsRepository.getAuthorID(username),
    };
    let formID: any;
    if (data?._id) {
      formID = await this.formsRepository.updateForm(data?._id, form);
    } else {
      formID = (await this.formsRepository.createForm(form))?._id;
    }
    return { message: 'Operation Successful.', formID: formID };
  }

  async deleteForm(id: string): Promise<object> {
    await this.formsRepository.deleteForm(id);
    return { message: 'Operation Successful.' };
  }

  async uploadFile(file: Express.Multer.File): Promise<object> {
    try {
      const link = await this.formsRepository.uploadFile(file);
      return { message: 'Operation Successful', link: link };
    } catch (error: any) {
      return { message: error.message, statusCode: error.statusCode };
    }
  }

  async deleteFile(fileName: string): Promise<object> {
    try {
      await this.formsRepository.deleteFile(fileName);
      return { message: 'Operation Successful' };
    } catch (error: any) {
      return { message: error.message, statusCode: error.statusCode };
    }
  }
}
