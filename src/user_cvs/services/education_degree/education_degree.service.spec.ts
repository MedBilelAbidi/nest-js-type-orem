import { Test, TestingModule } from '@nestjs/testing';
import { EducationDegreeService } from './education_degree.service';

describe('EducationDegreeService', () => {
  let service: EducationDegreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationDegreeService],
    }).compile();

    service = module.get<EducationDegreeService>(EducationDegreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
