import {Injectable} from '@nestjs/common';
import {Lesson, LessonSch} from '../schemas/lesson';
import { Model, Types } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class LessonsRepository {

    constructor(@InjectModel("Lesson")
                private readonly lessonsModel: Model<LessonSch>) {

    }

    async search(courseId:string,
          sortOrder:string,
           pageNumber: number,
           pageSize:number): Promise<Lesson[]> {

        console.log("searching for lessons ", courseId, sortOrder, pageNumber, pageSize);

        const courseIdAsObjectId = new Types.ObjectId(courseId);

        return await this.lessonsModel.find({course: courseIdAsObjectId}, null, {
            skip: pageNumber * pageSize,
            limit: pageSize,
            sort: {
                seqNo: sortOrder
            }
        }).exec();

    }

}
