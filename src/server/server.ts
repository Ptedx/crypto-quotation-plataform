import express,{Request, Response} from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import User from '../models/user';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { coinsData, CryptoData } from '../models/cyptoInfos';
import cors from 'cors'

dotenv.config()
const app = express()
app.use(bodyParser.json())
const httpServer = http.createServer(app)

app.use(cors({
    origin:'*',
    methods:['GET','POST']
}))

const mongoConnection = async ()=>{
    try{
        if(process.env.DB_URL){
            await mongoose.connect(process.env.DB_URL)
            console.log('Servidor MongoDB conectado com sucesso!')
        }
    }catch(error){
        console.log('Deu erro: ',error)
    }
}

async function hashPassword(password:string){
    const salt = await bycrypt.genSalt(10)
    return bycrypt.hash(password, salt)    
}

async function comparePasswords(password:string, hashedPassword:string){
    return bycrypt.compare(password, hashedPassword)
}

async function getChartInfos(coin:string){
        try{
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=180&interval=daily&precision=6`,
                {
                  headers:{
                    'x-cg-demo-api-key': process.env.COIN_API_KEY
                  }
                });
                return response.data.prices
        }catch(err){
            console.log('Deu errinho: '+err)
        }
}

async function getAllCoinInfos(){
    const fiveMinutes = 5*60*1000
    const last_update = await CryptoData.find({symbol:'btc'})
    const now = new Date()
    if((now.getTime() - last_update[0].last_update.getTime()) >= fiveMinutes){
        try{
                        const response = await axios.get(
                            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&sparkline=true&precision=7',
                            {
                              headers:{
                                'x-cg-demo-api-key': process.env.COIN_API_KEY
                              }
                            });
                            const operations = response.data.map((item:coinsData) => ({
                                updateOne: {
                                    filter: { symbol: item.symbol },
                                    update: {
                                        $set: {
                                            id: item.id,
                                            symbol: item.symbol,
                                            max_supply: item.max_supply,
                                            image: item.image,
                                            name: item.name,
                                            market_cap: item.market_cap,
                                            market_cap_change_24h: item.market_cap_change_24h,
                                            market_cap_rank: item.market_cap_rank,
                                            market_cap_change_percentage_24h: item.market_cap_change_percentage_24h,
                                            total_volume: item.total_volume,
                                            current_price: item.current_price,
                                            price_change_24h: item.price_change_24h,
                                            price_change_percentage_24h: item.price_change_percentage_24h,
                                            circulating_supply: item.circulating_supply,
                                            last_update: now,
                                            sparkline_in_7d: item.sparkline_in_7d,
                                        }
                                    },
                                    upsert: true
                                }
                            }))

                        await CryptoData.bulkWrite(operations)
                        return response.data
                    }catch(err){
                        console.log('Erro ao buscar informações das criptomoedas: '+err)
                    }
    }else{
        try{
            const result = await CryptoData.find({})
            return result
        }catch(err){
            return console.log('Erro ao buscar as informações do banco', err)
        }

    }
}

//Routes
app.get('/coins', async (req: Request , res:Response) => {
    try {
        const infos = await getAllCoinInfos();
        res.status(200).send(infos)
    } catch (err) {
        res.status(404).send({message: 'Error: Falha ao buscar as cotações das moedas'})
    }
});

app.get('/charts/:coin',async (req: Request ,res: Response)=>{
    const coin = req.params.coin
    try{
        const infos = await getChartInfos(coin)
        res.status(200).send(infos)
    }catch(err){
        res.status(404).send({message: err})
    }
})

app.post('/login', async (req: Request, res:Response)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    const auth = await comparePasswords(password, user!.password)
    if(user){
        if(auth){
            const token = jwt.sign({id: user.email, name: user.name},process.env.API_KEY!)
            res.status(200).json({message: 'Usuário Logado!', token: token, name: user.name})
        }else{
            res.status(401).json({message: 'Usuário e/ou Senha incorretos'})
        }
    }else{
        res.status(404).json({message: 'Usuário não encontrado!'})
    }
})

app.post('/register',async (req:Request, res:Response)=>{
    const {email, password,name} = req.body
    try{
        const user = new User(req.body)
        const userFind = await User.findOne({email})
        if(!userFind){
            user.password = await hashPassword(password)
            await user.save()
            const token = jwt.sign({id: email, name: name},process.env.API_KEY!)
            res.status(201).json({message:'Usuário salvo com sucesso!', token: token})
        }else{
            res.status(401).json({message: 'Erro: Usuário já cadastrado'})
        }

    }catch(error){
        console.log('Erro de registro: ',error)
    }
})

const port = process.env.PORT|| 3001

mongoConnection()
httpServer.listen(port, ()=>{console.log('Servidor Express Iniciado!')})