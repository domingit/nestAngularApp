import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put, UseGuards, UseInterceptors
} from '@nestjs/common';
import {Course} from '../schemas/course';
import {CoursesRepository} from '../services/courses.repository';
import {AdminGuard} from '../../guards/admin.guard';
import MongooseClassSerializerInterceptor from '../../serializers/mongoose-model-serializer';
import { AuthenticationGuard } from 'src/guards/authentication.guard';


@Controller("courses")
@UseInterceptors(MongooseClassSerializerInterceptor(Course))
@UseGuards(AuthenticationGuard)
export class CoursesController {

    constructor(private coursesDB: CoursesRepository/*,
        private mongooseHealth: MongooseHealthIndicator*/) {

    }

    @Post()
    @UseGuards(AdminGuard)
    async createCourse(@Body() course:Course): Promise<Course> {
        return this.coursesDB.addCourse(course);
    }

    @Get()
    async findAllCourses(): Promise<Course[]> {
        // this.mongooseHealth.pingCheck("mongoDB").then(res => console.log('>>> ', res))
        return this.coursesDB.findAll();
    }

    @Get(":courseUrl")
    async findCourseByUrl(@Param("courseUrl") courseUrl:string) {

        const course = await this.coursesDB.findCourseByUrl(courseUrl);

        if (!course) {
            throw new NotFoundException(
                "Could not find course for url " + courseUrl);
        }

        return course;
    }

    @Put(':courseId')
    @UseGuards(AdminGuard)
    async updateCourse(
        @Param("courseId") courseId:string,
        @Body() changes: Course):Promise<Course> {

        console.log("updating course");

        if (changes._id) {
            throw new BadRequestException("Can't update course id");
        }

        return this.coursesDB.updateCourse(courseId, changes);
    }

    @Delete(':courseId')
    @UseGuards(AdminGuard)
    async deleteCourse(@Param("courseId") courseId:string) {

        console.log("deleting course " + courseId);

        return this.coursesDB.deleteCourse(courseId);
    }



}


