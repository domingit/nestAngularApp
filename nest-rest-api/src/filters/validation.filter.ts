import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import {ValidationException} from './validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {

    catch(exception: ValidationException, host: ArgumentsHost): any {


        const ctx = host.switchToHttp(),
                response = ctx.getResponse(),
                request = ctx.getRequest<Request>();

        const message = 'Internal Server Error';

        return response.status(400).json({
           validationErrors: exception.validationErrors,
           statusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            createdBy: "ValidationFilter",
            path: request.url,
            message
        });

    }

}
