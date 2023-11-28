import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter{

    catch(exception: any, host: ArgumentsHost)  {

        console.error("fallback exception handler triggered",
            JSON.stringify(exception));

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();


        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.message
            : 'Internal Server Error';


        return response.status(status).json({
            statusCode: status,
            createdBy: "FallbackExceptionFilter",
            timestamp: new Date().toISOString(),
            path: request.url,
            message
        })

    }


}
