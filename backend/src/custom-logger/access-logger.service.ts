import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isLocal } from 'src/conf/enviroment';
import { isObject } from 'src/utils/typeguard';
import { createLogger, Logger, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import LOG_FORMAT from './conf';

@Injectable()
export class AccessLoggerService implements LoggerService {
  logger: Logger;

  constructor(private configService: ConfigService) {
    /** ローテーション */
    const logTransFormStream = new DailyRotateFile({
      level: 'info',
      filename: `${configService.get<string>(
        'ACCESS_LOG_DIR',
      )}/access_log_%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '1d',
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logTransFormStream.on('rotate', () => {});

    const t: Transport[] = [logTransFormStream];

    if (isLocal()) {
      t.push(new transports.Console({}));
    }

    this.logger = createLogger({
      format: LOG_FORMAT,
      transports: t,
    });
  }

  log(message: any) {
    if (isObject(message)) {
      this.logger.info(JSON.stringify(message));
    }
    this.logger.info(message);
  }
  error(message: object | string) {
    if (isObject(message)) {
      this.logger.error(JSON.stringify(message));
    }
    this.logger.error(message);
  }
  warn(message: object | string) {
    if (isObject(message)) {
      this.logger.warn(JSON.stringify(message));
    }
    this.logger.warn(message);
  }
  debug(message: object | string) {
    if (isObject(message)) {
      this.logger.debug(JSON.stringify(message));
    }
    this.logger.debug(message);
  }
}
