import mongoose,{Document, Schema} from "mongoose";

export interface coinsData{
  symbol:string,
  id: string,
  max_supply: string,
  image:string,
  name:string
  market_cap:string,
  market_cap_24h:string,
  market_cap_rank:string,
  market_cap_percentage_24h:string,
  total_volume:string,
  current_price:string,
  price_24h:string,
  price_percentage_24h:string,
  circulating_supply:string,
  last_update: Date,
  sparkline_in_7d: number[]
}

export type CoinsData = coinsData[]

const CryptosData = new Schema<coinsData>({
  id: {type: String, required: true},
  symbol: {type: String, required: true},
  max_supply: String,
  image:String,
  name: String,
  market_cap:String,
  market_cap_24h:String,
  market_cap_rank:String,
  market_cap_percentage_24h:String,
  total_volume:String,
  current_price:String,
  price_24h:String,
  price_percentage_24h:String,
  circulating_supply:String,
  sparkline_in_7d: [Number],
  last_update: {type: Date, default: Date.now}
})

const CryptoData = mongoose.model('CryptoData', CryptosData)

export { CryptoData }