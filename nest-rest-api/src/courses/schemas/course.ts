import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import {IsBoolean, IsInt, IsMongoId, IsString} from 'class-validator';
import { Document } from 'mongoose';

export class Course {
    @IsString()
    @IsMongoId()
    @Transform((params) => params.obj._id.toString())
    _id: string;
    @IsInt({message: 'seqNo must be numeric'}) seqNo: number;
    @IsString({always: false}) url: string;
    @IsString() iconUrl: string;
    @IsString() courseListIcon: string;
    @IsString() description: string;
    @IsString() longDescription?: string;
    @IsString() category: string;
    @IsInt() lessonsCount: number;
    @IsBoolean() promo: boolean;
}


export function compareCourses(c1: Course, c2: Course) {

    const compare = c1.seqNo - c2.seqNo;

    if (compare > 0) {
        return 1;
    } else if (compare < 0) {
        return -1;
    } else {
        return 0;
    }

}

@Schema()
export class Coursee extends Document {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsInt({ message: 'seqNo must be numeric' })
  @Prop()
  seqNo: number;

  @IsString({ always: false })
  @Prop()
  url: string;

  @IsString()
  @Prop()
  iconUrl: string;

  @IsString()
  @Prop()
  courseListIcon: string;

  @IsString()
  @Prop()
  description: string;

  @IsString()
  @Prop()
  longDescription?: string;

  @IsString()
  @Prop()
  category: string;

  @IsInt()
  @Prop()
  lessonsCount: number;

  @IsBoolean()
  @Prop()
  promo: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Coursee);
