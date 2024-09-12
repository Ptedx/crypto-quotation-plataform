const axios = require('axios');

async function getUSDTPairs() {
  try {
    const response = await axios.get(
      'https://coingecko.p.rapidapi.com/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false',
      {
        headers:{
          'x-rapidapi-host': 'coingecko.p.rapidapi.com',
          'x-rapidapi-key': 'c5445751b2msh2e0b3b82db53c50p1661bejsnf0d23522991d'
        }
      });
    const responseList = await axios.get(
      'https://coingecko.p.rapidapi.com/coins/list',
      {
        headers:{
          'x-rapidapi-host': 'coingecko.p.rapidapi.com',
          'x-rapidapi-key': 'c5445751b2msh2e0b3b82db53c50p1661bejsnf0d23522991d'
        }
      });
      console.log(response.data.market_data.current_price.usd);

      console.log(responseList.data.filter((item) => item.name === 'TRON'))
  } catch (error) {
    console.error('Erro ao obter os pares USDT:', error);
  }
}

getUSDTPairs();