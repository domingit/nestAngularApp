import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EmpsService } from './services/emp.repository';
import { UniqueEmpCodeValidator } from 'src/emp/validators/unique-emp-code-validator';
import { EmpController } from './controllers/emp.controller';
import { Emp, EmpSchema } from 'src/emp/schemas/schemas/emp.schema';

/* Defining  mongoose models to be used  in the current scope. */
const mongoModels = MongooseModule.forFeature([
    { name: Emp.name, schema: EmpSchema },
  ]);

@Module({
    imports: [
        mongoModels
    ],
    controllers: [
        EmpController
    ],
    providers: [EmpsService, UniqueEmpCodeValidator],
})
export class EmpModule {

}
