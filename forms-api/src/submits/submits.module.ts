import { Module } from '@nestjs/common';
import { SubmitsController } from './submits.controller';
import { SubmitsService } from './submits.service';
import { FormsModule } from 'src/forms/forms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Submit, SubmitSchema } from './database/model/submits.model';
import { SubmitsRepository } from './database/repository/submits.repository';
import { FirebaseModule } from '@app/common';

@Module({
  controllers: [SubmitsController],
  providers: [SubmitsService, SubmitsRepository],
  imports: [
    FormsModule,
    FirebaseModule,
    MongooseModule.forFeature([{ name: Submit.name, schema: SubmitSchema }]),
  ],
})
export class SubmitsModule {}
