import { Transform } from 'class-transformer';
import { IsArray, IsMongoId, IsString} from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class User {
    @IsString()
    @IsMongoId()
    @Transform((params) => params.obj._id.toString())
    _id: string;
    @IsString() email: string;
    @IsString() password: string;
    @IsArray() roles: Array<string>;
  }

@Schema()
export class UserSch {
  @Transform((params) => params.obj._id.toString())
  _id: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  roles: Array<string>;
}
export const UserSchema = SchemaFactory.createForClass(UserSch);