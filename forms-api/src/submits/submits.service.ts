import { Injectable } from '@nestjs/common';
import { FormsRepository } from 'src/forms/database/repository/forms.repository';
import { SubmitsRepository } from './database/repository/submits.repository';
import { Submit } from './database/model/submits.model';

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

  
  async getResponses(username: string): Promise<Submit[] | null> {
    const authorID = await this.formsRepository.getAuthorID(username);
    return await this.submitsRepository.getResponsesFromAuthorID(authorID);
  }

  async deleteResponse(id: string): Promise<object> {
    await this.submitsRepository.deleteResponse(id);
    return { message: 'Operation Successful.' };
  }
}
