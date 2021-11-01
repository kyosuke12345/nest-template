import { Test, TestingModule } from '@nestjs/testing';
import { SampleRelation1tonController } from './sample-relation1ton.controller';

describe('SampleRelation1tonController', () => {
  let controller: SampleRelation1tonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleRelation1tonController],
    }).compile();

    controller = module.get<SampleRelation1tonController>(
      SampleRelation1tonController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
