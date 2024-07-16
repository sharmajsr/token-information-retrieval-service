import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TokenResponseDto } from '../core/dtos';
import { QueryParamDto } from '../core/dtos/key-query-param.dto';
import { TokenGetQuery } from '../queries';

@Controller('token')
export class TokenController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}
  

  @ApiOperation({
    summary: 'Get Token',
  })
  @ApiOkResponse({
    type: TokenResponseDto,
  })
  @Get()
  async getById(@Query() query: QueryParamDto,@Req() req: Request) {
    console.log(`contr ${query.id}`)
    const headers = req.headers;
    return this.queryBus.execute(new TokenGetQuery(query.id,headers["authorization"]));
  }
}
