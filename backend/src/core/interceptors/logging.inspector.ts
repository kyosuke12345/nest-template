import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable, throwError } from 'rxjs';
import { AccessLoggerService } from 'src/custom-logger/access-logger.service';
import { ErrorLoggerService } from 'src/custom-logger/error-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly accessLogger: AccessLoggerService,
    private readonly errorLogger: ErrorLoggerService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const requestData = {
      ip: request.ip,
      method: request.method,
      url: request.url,
      body: request.body || {},
    };

    this.accessLogger.log(requestData);

    return next.handle().pipe(
      catchError((err) => {
        this.errorLogger.error({
          ...requestData,
          status: err?.status ?? err?.statusCode ?? 500,
          message: err?.message ?? '',
        });
        return throwError(() => new Error(err));
      }),
    );
    // .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
