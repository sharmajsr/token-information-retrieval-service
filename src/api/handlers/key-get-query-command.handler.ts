import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TokenClient } from 'src/connectors/clients';
import { TokenMapper } from '../core/mappers';
import { TokenGetQuery } from '../queries';

@QueryHandler(TokenGetQuery)
export class TokenGetQueryHandler implements IQueryHandler<TokenGetQuery> {
  constructor(
    private readonly tokenApiClient: TokenClient,
    private readonly tokenMapper: TokenMapper,
  ) {}

  async execute(query: TokenGetQuery) {
    console.log(` her ${query.id}`)
    const keyView = await this.tokenApiClient.getTokenDetails(query.id,query.token);

    return this.tokenMapper.mapToTokenRetrieveModel(keyView);
  }
}
