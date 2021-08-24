import { Test, TestingModule } from '@nestjs/testing';
import { CgvController } from './cgv.controller';

describe('CgvController', () => {
  let controller: CgvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CgvController],
    }).compile();

    controller = module.get<CgvController>(CgvController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
