import { Injectable } from '@nestjs/common';
import { UpdateFormRequest } from './dto/request/forms.request';
import { FormsRepository } from './database/repository/forms.repository';

@Injectable()
export class FormsService {
  constructor(private readonly formsRepository: FormsRepository) {}

  async createForm(
    name: string,
    fields: object,
    authorID: string,
  ): Promise<any> {
    return await this.formsRepository.createForm(name, fields, authorID);
  }

  async updateForm(data: UpdateFormRequest): Promise<object> {
    const { _id, ...fields } = data;
    await this.formsRepository.updateForm(_id, fields as any);
    return { message: 'Operation Successful.' };
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
