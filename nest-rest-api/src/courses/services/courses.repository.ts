import {Injectable} from '@nestjs/common';
import {Course} from '../schemas/course';

import { Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class CoursesRepository {


    constructor(@InjectModel('Course')
                private readonly courseModel: Model<Course>) {
    }

    async findAll(): Promise<Course[]> {
        return await this.courseModel.find().exec();
    }

    async findCourseByUrl(courseUrl:string): Promise<Course> {
        return this.courseModel.findOne({url:courseUrl});
    }

    updateCourse(courseId: string, changes: Partial<Course>):Promise<Course> {
        return this.courseModel.findOneAndUpdate(
            {_id: courseId},
            changes,
            {new:true});
    }

    deleteCourse(courseId: string) {
        return this.courseModel.deleteOne({_id:courseId});
    }

    async addCourse(course: Partial<Course>): Promise<Course> {

        const newCourse = new this.courseModel(course);

        await newCourse.save();

        return newCourse.toObject({versionKey:false});

    }
}











