import { HttpException } from '@nestjs/common';
import { ERROR } from '../error/codes';


export class CoinGeckoException extends HttpException {
  constructor(message: string, statusCode: number) {
    const error = ERROR.COIN_NOT_FOUND_ERROR(message);
    super(error, statusCode);
  }
}
