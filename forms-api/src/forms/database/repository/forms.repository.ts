import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form } from '../model/forms.model';
import { UserRepository } from '../../../user/database/repository/user.repository';
import {
  FirebaseStorage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

@Injectable()
export class FormsRepository {
  protected readonly logger = new Logger(FormsRepository.name);

  constructor(
    @InjectModel(Form.name) public readonly formModel: Model<Form>,
    @Inject('FIREBASE_STORAGE')
    private readonly firebaseStorage: FirebaseStorage,
    private readonly userRepository: UserRepository,
  ) {}

  async findByID(id: string): Promise<Form | null> {
    return await this.formModel.findById(id).exec();
  }

  async findByAuthorUsername(username: string): Promise<Form[] | null> {
    const authorID = await this.getAuthorID(username);
    return await this.formModel.find({ authorID: authorID }).exec();
  }

  async getAuthorID(username: string) {
    const author = await this.userRepository.findByUsername(username);
    return author?._id;
  }

  async createForm(updates: any) {
    const form = new this.formModel({
      name: updates?.name,
      sections: updates?.sections,
      authorID: updates?.authorID,
    });

    await form.save();
    return form;
  }

  async updateForm(id: string, updates: any) {
    await this.formModel.updateOne({ _id: id }, updates).exec();
    return id;
  }

  async deleteForm(id: string) {
    await this.formModel.findByIdAndDelete(id).exec();
  }

  async uploadFile(file: Express.Multer.File): Promise<string | undefined> {
    const fileData = file.buffer;
    const storageRef = ref(
      this.firebaseStorage,
      'submits/' + file?.originalname,
    );
    const metadata = {
      contentType: file.mimetype,
    };
    await uploadBytes(storageRef, fileData, metadata);
    return await getDownloadURL(storageRef);
  }

  async deleteFile(fileName: string) {
    const fileRef = ref(this.firebaseStorage, 'submits/' + fileName);
    await deleteObject(fileRef);
  }
}
