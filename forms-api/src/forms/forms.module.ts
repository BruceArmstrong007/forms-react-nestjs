import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormsRepository } from './database/repository/forms.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './database/model/forms.model';

@Module({
  providers: [FormsService, FormsRepository],
  controllers: [FormsController],
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
  ],
  exports: [FormsService, FormsRepository],
})
export class FormsModule {}
