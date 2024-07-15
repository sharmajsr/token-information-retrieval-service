import { Injectable } from "@nestjs/common";
import { firstValueFrom, flatMap } from "rxjs";
import { TokenRetriveResponse } from "../models";
import { HttpService } from '@nestjs/axios';
import { CoinGeckoException } from "src/building-blocks/exception/no-token-found-exception";

@Injectable()
export class TokenClient{
    constructor(
        private readonly httpService: HttpService,
      ) {}

    async getTokenDetails(id :string ): Promise<TokenRetriveResponse>{
      let keyRetriveResponse = new TokenRetriveResponse();
      
      try{
        const headers = {
          "x-cg-demo-api-key":process.env.CG_TOKEN,
      }
      let fUrl = `https://api.coingecko.com/api/v3/coins/${id}`
      let respData =  await firstValueFrom(this.httpService.get<Request>(fUrl, {
        headers
      }))
      keyRetriveResponse.id = respData.data["id"]
      keyRetriveResponse.symbol = respData.data["symbol"]
      keyRetriveResponse.name = respData.data["name"]
      keyRetriveResponse.web_slug = respData.data["web_slug"]
      }catch(error){
        throw new CoinGeckoException(
          error.response.data,400
        );
      }
        return keyRetriveResponse;
    }

}