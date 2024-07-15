/* eslint-disable max-lines-per-function */
import { Injectable } from '@nestjs/common';
import { TokenRetriveResponse } from 'src/connectors/models';
import { TokenResponseDto } from '../dtos';


@Injectable()
export class TokenMapper {

  mapToTokenRetrieveModel(tokenResponse: TokenRetriveResponse): TokenResponseDto {
    return {
      id : tokenResponse.id,
      name : tokenResponse.name,
      slug : tokenResponse.web_slug,
      symbol : tokenResponse.symbol
    };
  }

}
