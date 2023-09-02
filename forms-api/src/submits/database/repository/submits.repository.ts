import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Submit } from '../model/submits.model';
import {
  FirebaseStorage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
@Injectable()
export class SubmitsRepository {
  protected readonly logger = new Logger(SubmitsRepository.name);

  constructor(
    @Inject('FIREBASE_STORAGE')
    private readonly firebaseStorage: FirebaseStorage,
    @InjectModel(Submit.name) public readonly submitModel: Model<Submit>,
  ) {}

  async storeForm(sections: object, authorID: string, formID: string) {
    const newForm = new this.submitModel({
      sections,
      authorID: new Types.ObjectId(authorID),
      formID: new Types.ObjectId(formID),
    });
    await newForm.save();
  }

  async uploadFile(file: Express.Multer.File): Promise<string | undefined> {
    const fileData = file.buffer;
    const storageRef = ref(this.firebaseStorage, 'form/' + file?.originalname);
    const metadata = {
      contentType: file.mimetype,
    };
    await uploadBytes(storageRef, fileData, metadata);
    return await getDownloadURL(storageRef);
  }

  async deleteFile(fileName: string) {
    const fileRef = ref(this.firebaseStorage, 'form/' + fileName);
    await deleteObject(fileRef);
  }

  async getResponsesFromAuthorID(authorID: string): Promise<Submit[] | null> {
    return await this.submitModel.find({ authorID: authorID }).exec();
  }

  async deleteResponse(id: string) {
    await this.submitModel.findByIdAndDelete(id).exec();
  }
}
