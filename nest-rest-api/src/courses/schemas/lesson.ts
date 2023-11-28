import { Transform } from 'class-transformer';
import { IsInt, IsMongoId, IsString} from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class Lesson {
  @IsString()
  @IsMongoId()
  @Transform((params) => params.obj._id.toString())
  _id: string;
  @IsString() description: string;
  @IsString() duration: string;
  @IsInt({message: 'seqNo must be numeric'}) seqNo: number;
  @Prop()
  course: string;
}

@Schema()
export class LessonSch {
  @Transform((params) => params.obj._id.toString())
  _id: string;
  @Prop()
  description: string;
  @Prop()
  duration: string;
  @Prop()
  seqNo: number;
  @Prop()
  course: string;
}
export const LessonSchema = SchemaFactory.createForClass(LessonSch);


export function compareLessons(l1:Lesson, l2: Lesson) {

  const compareCourses = l1.seqNo - l2.seqNo;

  if (compareCourses > 0) {
    return 1;
  }
  else if (compareCourses < 0){
    return -1;
  }
  else {
    return l1.seqNo - l2.seqNo;
  }

}


@Schema()
export class Lessonn extends Document {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  @Prop()
  description: string;

  @IsString()
  @Prop()
  duration: string;

  @IsInt({ message: 'seqNo must be numeric' })
  @Prop()
  seqNo: number;

  @IsMongoId()
  @Prop()
  course: string;
}

export const LessonnSchema = SchemaFactory.createForClass(Lessonn);