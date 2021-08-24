import { Test, TestingModule } from '@nestjs/testing';
import { CgvService } from './cgv.service';

describe('CgvService', () => {
  let service: CgvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CgvService],
    }).compile();

    service = module.get<CgvService>(CgvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
