import { Injectable } from "@nestjs/common";
import { firstValueFrom, flatMap } from "rxjs";
import { TokenRetriveResponse } from "../models";
import { HttpService } from '@nestjs/axios';
import { CoinGeckoException } from "src/building-blocks/exception/no-token-found-exception";
import { RateLimitException } from "src/building-blocks/exception/rate-limit-exceeded-exception";

@Injectable()
export class TokenClient{
    constructor(
        private readonly httpService: HttpService,
      ) {}

    async getTokenDetails(id :string , token:string): Promise<TokenRetriveResponse>{

      const url = `http://localhost:3001/key/user-access?id=${token}`;
      const headers = { Authorization: 'Bearer static-jwt-token' };
  
      try {
        const response = await firstValueFrom(
          this.httpService.get(url, { headers })
        );
        console.log(response.data)
        console.log(response.data.status)
        if (response.data.status) {
          
          const url = 'http://localhost:3001/key/add-requests';
          const data = {
            id: `${token}`
          };
          const headers = {
            Authorization: 'Bearer static-jwt-token',
            'Content-Type': 'application/json',
          };
      
          try {
            const response = await firstValueFrom(
              this.httpService.post(url, data, { headers })
            );
            // return response.data; 
          } catch (error) {
            // handle error as appropriate
            console.error('Error occurred:', error);
            throw error;
          }
        

          
        } else {
          throw new RateLimitException(
            "you have made too many requests in last minute, please try after a minute",400
          );
        }
      } catch (error) {
        throw new RateLimitException(
            "http error, please contact support",400
          );
      }

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