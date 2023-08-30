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

  async submitForm(data: object, authorID: string): Promise<object> {
    await this.submitsRepository.storeForm(data, authorID);
    return { message: 'Operation successful.' };
  }

  // async uploadFile(
  //   file: string,
  //   authorID: string,
  //   name: string,
  //   type: string,
  // ): Promise<object> {
  //   return {
  //     _id: await this.fileRepository.uploadFile(file, authorID, name, type),
  //   };
  // }

  // async getFile(id: string): Promise<object> {
  //   return await this.fileRepository.getFile(id);
  // }
}
