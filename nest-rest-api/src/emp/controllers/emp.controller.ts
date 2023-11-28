import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { CreateEmpDto } from '../schemas/dto/create-emp-dto';
import { UpdateEmpDto } from '../schemas/dto/update-emp-dto';
import { EmpsService } from '../services/emp.repository';
import { Emp } from '../schemas/schemas/emp.schema';
import MongooseClassSerializerInterceptor from '../../serializers/mongoose-model-serializer';

@Controller('/emp')
@UseInterceptors(MongooseClassSerializerInterceptor(Emp))
export class EmpController {
  constructor(private readonly empService: EmpsService) {}

  @Post()
  async create(@Body() createEmpDto: CreateEmpDto) {
    return this.empService.create(createEmpDto);
  }

  @Get()
  findAll() {
    return this.empService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.empService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmpDto: UpdateEmpDto) {
    return await this.empService.update(id, updateEmpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empService.remove(id);
  }
}
