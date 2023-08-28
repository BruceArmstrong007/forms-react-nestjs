import { Test, TestingModule } from '@nestjs/testing';
import { SubmitsController } from './submits.controller';

describe('SubmitsController', () => {
  let controller: SubmitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitsController],
    }).compile();

    controller = module.get<SubmitsController>(SubmitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
