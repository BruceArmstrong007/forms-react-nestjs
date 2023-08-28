import { Module } from '@nestjs/common';
import { SubmitsController } from './submits.controller';
import { SubmitsService } from './submits.service';
import { FormsModule } from 'src/forms/forms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Submit, SubmitSchema } from './database/model/submits.model';
import { SubmitsRepository } from './database/repository/submits.repository';
import { FileSchema, File } from './database/model/file.model';
import { FileRepository } from './database/repository/file.repository';

@Module({
  controllers: [SubmitsController],
  providers: [SubmitsService, SubmitsRepository, FileRepository],
  imports: [
    FormsModule,
    MongooseModule.forFeature([
      { name: Submit.name, schema: SubmitSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
})
export class SubmitsModule {}
