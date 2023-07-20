import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cars')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return this.appService.getTest();
  }
}
