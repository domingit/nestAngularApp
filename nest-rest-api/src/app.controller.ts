import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInit() {
    return { message: 'Application is running' };
  }
}
