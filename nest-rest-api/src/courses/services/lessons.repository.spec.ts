import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { LessonsRepository } from './lessons.repository';
import { Model, Types } from 'mongoose';
import { Lesson } from '../schemas/lesson';

describe('LessonsRepository', () => {
  let lessonsRepository: LessonsRepository;
  let lessonsModel: Model<Lesson>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsRepository,
        {
          provide: getModelToken('Lesson'),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    lessonsRepository = module.get<LessonsRepository>(LessonsRepository);
    lessonsModel = module.get<Model<Lesson>>(getModelToken('Lesson'));
  });

  describe('search', () => {
    it('should return an array of lessons', async () => {
      const mockLessons = [{}, {}] as Lesson[];
      const courseId = 'some_course_id';

      const objectIdMock = jest.spyOn(Types, 'ObjectId');
      objectIdMock.mockImplementation((value: any) => value);

      jest.spyOn(lessonsModel, 'find').mockReturnValueOnce(mockLessons as any);

      const result = await lessonsRepository.search(courseId, 'asc', 0, 3);

      expect(result).toEqual(mockLessons);
      expect(Types.ObjectId).toHaveBeenCalledWith(courseId);
    });
  });
});