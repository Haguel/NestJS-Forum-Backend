import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const httpStatus: number = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorMessage: string = exception instanceof HttpException
            ? exception.message
            : "Internal Server Error";

        const responseBody = {
            statusCode: httpStatus,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: errorMessage
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}