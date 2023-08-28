import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form } from '../model/forms.model';

@Injectable()
export class FormsRepository {
  protected readonly logger = new Logger(FormsRepository.name);

  constructor(@InjectModel(Form.name) public readonly formModel: Model<Form>) {}

  async findByID(id: string): Promise<Form | null> {
    return await this.formModel.findById(id).exec();
  }

  async findByAuthorID(id: string): Promise<Form | null> {
    return await this.formModel.findOne({ authorID: id }).exec();
  }

  async createForm(
    name: string,
    fields: object,
    authorID: string,
  ): Promise<Form> {
    const newForm = new this.formModel({
      name,
      fields,
      authorID,
    });
    await newForm.save();
    return newForm._id.toString();
  }

  async updateForm(id: string, updates: Partial<Form>): Promise<Form | null> {
    return this.formModel
      .findByIdAndUpdate(
        id,
        {
          ...updates,
        },
        { new: true },
      )
      .exec();
  }

  async deleteForm(id: string) {
    await this.formModel.findByIdAndDelete(id).exec();
  }
}
