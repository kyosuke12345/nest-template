import { Test, TestingModule } from '@nestjs/testing';
import { SampleRelationntonService } from './sample-relationnton.service';

describe('SampleRelationntonService', () => {
  let service: SampleRelationntonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleRelationntonService],
    }).compile();

    service = module.get<SampleRelationntonService>(SampleRelationntonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
