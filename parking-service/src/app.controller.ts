import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return "Hello :)";
  }
}
