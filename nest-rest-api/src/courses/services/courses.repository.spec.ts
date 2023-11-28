import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CoursesRepository } from './courses.repository';
import { Model } from 'mongoose';
import { Course } from '../schemas/course';

describe('CoursesRepository', () => {
  let coursesRepository: CoursesRepository;
  let courseModel: Model<Course>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesRepository,
        {
          provide: getModelToken('Course'),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    coursesRepository = module.get<CoursesRepository>(CoursesRepository);
    courseModel = module.get<Model<Course>>(getModelToken('Course'));
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const mockCourses = [{}, {}] as Course[];
      jest.spyOn(courseModel, 'find').mockReturnValueOnce(mockCourses as any);

      const result = await coursesRepository.findAll();

      expect(result).toEqual(mockCourses);
    });
  });
});