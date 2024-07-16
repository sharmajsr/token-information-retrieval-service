export const ERROR = {
   
    COIN_NOT_FOUND_ERROR: (error) => {
      return [
        {
          code: 'COIN_NOT_FOUND_ERROR',
          message:
            'coin gecko return an error, check list of available coins from coingecko',
          connectorError: error,
        },
      ];
    },
    RATE_LIMIT_EXCEEDED_EXCEPTION: (error) => {
      return [
        {
          code: 'RATE_LIMIT_EXCEEDED_EXCEPTION',
          message:
            'rate limit has been exceeded for the last minute',
          connectorError: error,
        },
      ];
    }
   
  };
  