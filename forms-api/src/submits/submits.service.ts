import { Injectable } from '@nestjs/common';
import { FormsRepository } from 'src/forms/database/repository/forms.repository';
import { SubmitsRepository } from './database/repository/submits.repository';

@Injectable()
export class SubmitsService {
  constructor(
    private readonly formsRepository: FormsRepository,
    private readonly submitsRepository: SubmitsRepository,
  ) {}

  async getForm(id: string): Promise<object> {
    return await this.formsRepository.findByID(id);
  }

  async submitForm(
    sections: any[],
    authorID: string,
    formID: string,
  ): Promise<object> {
    await this.submitsRepository.storeForm(sections, authorID, formID);
    return { message: 'Operation successful.' };
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
