const axios = require('axios');

async function getUSDTPairs() {
  try {
    const coinData = await axios.get(
      // 'https://coingecko.p.rapidapi.com/coins/bitcoincash?localization=false&tickers=false&market_data=true&community_data=false',
      // 'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true',
      `https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=180&interval=daily&precision=6`,
      // 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&precision=6',
      {
        headers:{
            'x-cg-demo-api-key': process.env.COIN_API_KEY
          // 'x-rapidapi-host': 'coingecko.p.rapidapi.com',
          // 'x-rapidapi-key': 'c5445751b2msh2e0b3b82db53c50p1661bejsnf0d23522991d'
        }
      });
      
      // const ItemList = []

      // coinData.data.map(item=>{
      //   ItemList.push({price: item.current_price, symbol: item.symbol})
      // })
      
      console.log(coinData.data)
   
  } catch (error) {
    console.error('Erro ao obter os pares USDT:', error);
  }
}

getUSDTPairs();