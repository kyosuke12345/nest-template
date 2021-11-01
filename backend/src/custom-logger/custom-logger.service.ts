import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isLocal } from 'src/conf/enviroment';
import { isObject } from 'src/utils/typeguard';
import { createLogger, Logger, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';

@Injectable()
export class CustomLoggerService implements LoggerService {
  logger: Logger;

  constructor(private configService: ConfigService) {
    const logFormat = format.combine(format.timestamp(), format.json());
    /** エラーログのローテーション設定 */
    const errorTransFormStream = new DailyRotateFile({
      level: 'error',
      filename: `${configService.get<string>(
        'ERROR_LOG_DIR',
      )}/error_%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    });
    // rotation時に特に何もしない
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    errorTransFormStream.on('rotate', () => {});

    /** 通常ログのローテーション */
    const logTransFormStream = new DailyRotateFile({
      level: isLocal() ? 'debug' : 'info',
      filename: `${configService.get<string>('INFO_LOG_DIR')}/info_%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logTransFormStream.on('rotate', () => {});

    const t: Transport[] = [errorTransFormStream, logTransFormStream];

    if (isLocal()) {
      t.push(new transports.Console({}));
    }

    this.logger = createLogger({
      format: logFormat,
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
