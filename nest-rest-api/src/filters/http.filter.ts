import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';


@Catch(HttpException)
export class HttpExceptionFilter implements  ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        console.error("HTTP exception handler triggered",
            JSON.stringify(exception));

        const ctx = host.switchToHttp();

        const response = ctx.getResponse(),
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              request = ctx.getRequest(),
              statusCode = exception.getStatus();
        const message = exception.getResponse() as string | string[];


        return response.status(statusCode).json({
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
            createdBy: "HttpExceptionFilter",
            path: request.url,
            message
        });
    }

}
