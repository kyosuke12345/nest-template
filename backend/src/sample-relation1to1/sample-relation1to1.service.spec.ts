import { Test, TestingModule } from '@nestjs/testing';
import { SampleRelation1to1Service } from './sample-relation1to1.service';

describe('SampleRelation1to1Service', () => {
  let service: SampleRelation1to1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleRelation1to1Service],
    }).compile();

    service = module.get<SampleRelation1to1Service>(SampleRelation1to1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
