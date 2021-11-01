import { Module, Global } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

// import しなくても使用できるように
@Global()
@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
