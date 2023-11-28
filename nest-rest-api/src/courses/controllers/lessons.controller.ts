import {BadRequestException, Controller, Get, ParseIntPipe, Query, UseInterceptors} from '@nestjs/common';
import {LessonsRepository} from '../services/lessons.repository';
import MongooseClassSerializerInterceptor from '../../serializers/mongoose-model-serializer';
import { Course } from 'src/courses/schemas/course';


@Controller("lessons")
@UseInterceptors(MongooseClassSerializerInterceptor(Course))
export class LessonsController {

    constructor(private lessonsDB: LessonsRepository) {

    }

    @Get()
    searchLesson(
        @Query("courseId") courseId:string,
        @Query("sortOrder") sortOrder = "asc",
        @Query("pageNumber", ParseIntPipe) pageNumber = 0,
        @Query("pageSize", ParseIntPipe) pageSize = 3) {

        if (!courseId) {
            throw new BadRequestException("courseId must be defined");
        }

        if(sortOrder != "asc" && sortOrder != 'desc') {
            throw new BadRequestException('sortOrder must be asc or desc');
        }

        console.log('searchLesson > ', courseId);

        return this.lessonsDB.search(courseId,
            sortOrder, pageNumber, pageSize);
    }
}
