import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from '../model/file.model';

@Injectable()
export class FileRepository {
  protected readonly logger = new Logger(FileRepository.name);

  constructor(@InjectModel(File.name) public readonly fileModel: Model<File>) {}

  async uploadFile(
    fileBase64String: string,
    authorID: string,
    name: string,
    type: string,
  ): Promise<string> {
    const newForm = new this.fileModel({
      buffer: fileBase64String,
      authorID,
      name,
      type
    });
    await newForm.save();
    return newForm._id.toString();
  }

  async getFile(id: string): Promise<File> {
    return await this.fileModel.findById(id).exec();
  }
}
