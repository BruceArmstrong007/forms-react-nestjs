import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submit } from '../model/submits.model';

@Injectable()
export class SubmitsRepository {
  protected readonly logger = new Logger(SubmitsRepository.name);

  constructor(
    @InjectModel(Submit.name) public readonly submitModel: Model<Submit>,
  ) {}


  async storeForm(data: object, authorID: string) {
    const newForm = new this.submitModel({
      data: JSON.stringify(data),
      authorID
    });
    await newForm.save();
  }

}
