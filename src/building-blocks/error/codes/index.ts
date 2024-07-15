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
    }
   
  };
  