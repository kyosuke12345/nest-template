import { Test, TestingModule } from '@nestjs/testing';
import { SampleRelation1tonService } from './sample-relation1ton.service';

describe('SampleRelation1tonService', () => {
  let service: SampleRelation1tonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleRelation1tonService],
    }).compile();

    service = module.get<SampleRelation1tonService>(SampleRelation1tonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
