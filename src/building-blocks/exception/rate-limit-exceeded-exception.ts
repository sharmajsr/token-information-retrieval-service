import { HttpException } from '@nestjs/common';
import { ERROR } from '../error/codes';


export class RateLimitException extends HttpException {
  constructor(message: string, statusCode: number) {
    const error = ERROR.RATE_LIMIT_EXCEEDED_EXCEPTION(message);
    super(error, statusCode);
  }
}
