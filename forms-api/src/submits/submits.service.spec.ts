import { Test, TestingModule } from '@nestjs/testing';
import { SubmitsService } from './submits.service';

describe('SubmitsService', () => {
  let service: SubmitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitsService],
    }).compile();

    service = module.get<SubmitsService>(SubmitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
