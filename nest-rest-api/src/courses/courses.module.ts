import {Module} from '@nestjs/common';
import {CoursesController} from './controllers/courses.controller';
import {MongooseModule} from '@nestjs/mongoose';
// import {CoursesSchema} from './schemas/courses.schemaDB';
import {CoursesRepository} from './services/courses.repository';
import {LessonsSchema} from './schemas/lessons.schemaDB';
import {LessonsRepository} from './services/lessons.repository';
import {LessonsController} from './controllers/lessons.controller';
import { CourseSchema } from './schemas/course';


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "Course", schema: CourseSchema},
            {name: "Lesson", schema: LessonsSchema}
        ])
    ],
    controllers: [
        CoursesController,
        LessonsController
    ],
    providers: [
        CoursesRepository,
        LessonsRepository
    ]
})
export class CoursesModule {

}
