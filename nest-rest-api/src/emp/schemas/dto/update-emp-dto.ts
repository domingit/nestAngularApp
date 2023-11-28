import { IsInt, IsString } from 'class-validator';

export class UpdateEmpDto {
  @IsString()
  name: string;
  @IsString()
  emp_code: string;
  @IsInt()
  salary: number;
}
