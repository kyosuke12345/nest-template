import { Test, TestingModule } from '@nestjs/testing';
import { SampleRelation1to1Controller } from './sample-relation1to1.controller';

describe('SampleRelation1to1Controller', () => {
  let controller: SampleRelation1to1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleRelation1to1Controller],
    }).compile();

    controller = module.get<SampleRelation1to1Controller>(SampleRelation1to1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
