import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isObject } from 'src/utils/typeguard';
import { createLogger, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import LOG_FORMAT from './conf';

@Injectable()
export class ErrorLoggerService implements LoggerService {
  logger: Logger;

  constructor(private configService: ConfigService) {
    /** ローテーション */
    const logTransFormStream = new DailyRotateFile({
      level: 'error',
      filename: `${configService.get<string>(
        'ERROR_LOG_DIR',
      )}/error_log_%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '1d',
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logTransFormStream.on('rotate', () => {});

    const t: Transport[] = [logTransFormStream];

    this.logger = createLogger({
      format: LOG_FORMAT,
      transports: t,
    });
  }

  log(message: any) {
    if (isObject(message)) {
      this.logger.info(JSON.stringify(message));
    } else {
      this.logger.info(message);
    }
  }
  error(message: object | string) {
    if (isObject(message)) {
      this.logger.error(JSON.stringify(message));
    } else {
      this.logger.error(message);
    }
  }
  warn(message: object | string) {
    if (isObject(message)) {
      this.logger.warn(JSON.stringify(message));
    } else {
      this.logger.warn(message);
    }
  }
  debug(message: object | string) {
    if (isObject(message)) {
      this.logger.debug(JSON.stringify(message));
    } else {
      this.logger.debug(message);
    }
  }
}
