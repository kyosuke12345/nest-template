import { Test, TestingModule } from '@nestjs/testing';
import { SampleRelationntonController } from './sample-relationnton.controller';

describe('SampleRelationntonController', () => {
  let controller: SampleRelationntonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleRelationntonController],
    }).compile();

    controller = module.get<SampleRelationntonController>(SampleRelationntonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
