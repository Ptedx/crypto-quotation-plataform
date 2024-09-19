
interface dataProps{
    id: number,
    coinName: string,
    coinId:string,
    price: number,
    pricePercetage: number,
    image: number
}

export const data_api:dataProps[]=[
        {
            id: 1,
            coinName: 'Bitcoin',
            coinId: 'bitcoin',
            price: 29000,
            pricePercetage: 3.24,
            image: require('../img/coins/bitcoin.png')
        },
        {
            id: 2,
            coinName: 'Ethereum',
            coinId: 'ethereum',
            price: 1800,
            pricePercetage: -1.24,
            image: require('../img/coins/ethereum.png')
        },
        {
            id: 3,
            coinName: 'Binance Coin',
            coinId: 'binancecoin',
            price: 320.24,
            pricePercetage: 5.24,
            image: require('../img/coins/binanceCoin.png')
        },
        {
            id: 4,
            coinName: 'Cardano',
            coinId: 'cardano',
            price: 0.532,
            pricePercetage: 2.24,
            image: require('../img/coins/cardano.png')
        },
        {
            id: 5,
            coinName: 'Tether',
            coinId: 'tether',
            price: 1.207,
            pricePercetage: 0.17,
            image: require('../img/coins/tether.png')
        },
        {
            id: 6,
            coinName: 'Dogecoin',
            coinId: 'dogecoin',
            price: 0.087,
            pricePercetage: 10.24,
            image: require('../img/coins/doceCoin.png')
        },
        {
            id: 7,
            coinName: 'Polkadot',
            coinId: 'polkadot',
            price: 6.50,
            pricePercetage: -3.24,
            image: require('../img/coins/polkadot.png')
        },
        {
            id: 8,
            price: 0.45,
            coinName: 'Polygon',
            coinId: 'matic-network',
            pricePercetage: 1.24,
            image: require('../img/coins/polygon.png')
        },
        {
            id: 9,
            coinName: 'Litecoin',
            coinId: 'litecoin',
            price: 80,
            pricePercetage: 4.24,
            image: require('../img/coins/litecoin.png')
        },
        {
            id: 10,
            coinName: 'USDC',
            coinId: 'usd-coin',
            price: 6.00,
            pricePercetage: -2.24,
            image: require('../img/coins/usdc.png')
        },
        {
            id: 11,
            coinName: 'Chainlink',
            coinId: 'chainlink',
            price: 8.50,
            pricePercetage: 3.24,
            image: require('../img/coins/chainlink.png')
        },
        {
            id: 12,
            coinName: 'Solana',
            coinId: 'solana',
            price: 25,
            pricePercetage: 5.24,
            image: require('../img/coins/solana.png')
        },
        {
            id: 13,
            coinName: 'Bitcoin Cash',
            coinId: 'bitcoin-cash',
            price: 200,
            pricePercetage: -1.24,
            image: require('../img/coins/bitcoinCash.png')
        },
        {
            id: 14,
            coinName: 'Stellar',
            coinId: 'stellar',
            price: 0.12,
            pricePercetage: 2.24,
            image: require('../img/coins/stellar.png')
        },
        {
            id: 15,
            coinName: 'Tron',
            coinId: 'tron',
            price: 0.05,
            pricePercetage: 10.24,
            image: require('../img/coins/tron.png')
        }
]