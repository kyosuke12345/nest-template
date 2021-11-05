import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SystemLoggerService } from './custom-logger/system-logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: SystemLoggerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('log')
  writeLog(): string {
    this.logger.log(`test log :${new Date().getTime()}`);
    return 'info log write complete';
  }

  @Get('errorLog')
  writeErrorLog(): string {
    this.logger.error(`test error log :${new Date().getTime()}`);
    return 'error log write complete';
  }
}
