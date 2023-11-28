import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EmpsService } from 'src/emp/services/emp.repository';

@ValidatorConstraint({ name: 'UniqueEmpCodeValidator', async: true })
@Injectable()
export class UniqueEmpCodeValidator implements ValidatorConstraintInterface {
  constructor(private readonly empService: EmpsService) {}

  validate = async (
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: ValidationArguments,
  ): Promise<boolean> => {
    /*
      If a record already exists with given emp_code, return false
    */
    const entity = await this.empService.findOneByEmpCode(value);
    return !entity;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return `Employee code must be unique`;
  }
}
