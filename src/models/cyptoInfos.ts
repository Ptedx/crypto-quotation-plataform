import mongoose,{Document, Schema} from "mongoose";

export interface coinsData{
  symbol:string,
  id: string,
  image:string,
  name:string
  max_supply: number,
  market_cap:number,
  market_cap_change_24h:number,
  market_cap_rank:number,
  market_cap_change_percentage_24h:number,
  total_volume:number,
  current_price:number,
  price_change_24h: number,
  price_change_percentage_24h:number,
  circulating_supply:number,
  last_update: Date,
  sparkline_in_7d: {
    price:number[]
  },
}

export type CoinsData = coinsData[]

const CryptosData = new Schema<coinsData>({
  id: {type: String, required: true},
  symbol: {type: String, required: true},
  image:String,
  name: String,
  max_supply: Number,
  market_cap:Number,
  market_cap_change_24h:Number,
  market_cap_rank:Number,
  market_cap_change_percentage_24h:Number,
  total_volume:Number,
  current_price:Number,
  price_change_24h:Number,
  price_change_percentage_24h:Number,
  circulating_supply:Number,
  sparkline_in_7d: {
    price:[Number]
  },
  last_update: {type: Date, default: Date.now}
})

const CryptoData = mongoose.model('CryptoData', CryptosData)

export { CryptoData }