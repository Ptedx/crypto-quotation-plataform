import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import 'dotenv/config'
import User from './src/models/user'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
app.use(bodyParser.json())
const httpServer = http.createServer(app)

const mongoConnection = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log('Servidor MongoDB conectado com sucesso!')
    }catch(error){
        console.log('Deu erro: ',error)
    }
}

async function hashPassword(password){
    const salt = await bycrypt.genSalt(10)
    return bycrypt.hash(password, salt)    
}

async function comparePasswords(password, hashedPassword){
    return bycrypt.compare(password, hashedPassword)
}

async function getCoinInfos(coinId){
    const response = await axios.get(
        `https://coingecko.p.rapidapi.com/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=true`,
        {
          headers:{
            'x-rapidapi-host': 'coingecko.p.rapidapi.com',
            'x-rapidapi-key': 'c5445751b2msh2e0b3b82db53c50p1661bejsnf0d23522991d'
          }
        });
    
    return response.data.market_data.current_price.usd
}

//Routes
app.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    const auth = await comparePasswords(password, user.password)
    if(user){
        if(auth){
            const token = jwt.sign({id: user.id, name: user.name},process.env.API_KEY,{expiresIn: process.env.JWT_EXP})
            return res.status(200).json({message: 'Usuário Logado!', token: token, name: user.name})
        }
        return res.status(401).json({message: 'Usuário e/ou Senha incorretos'})
    }
    return res.status(404).json({message: 'Usuário não encontrado!'})
})

app.post('/register',async (req, res)=>{
    const {name , email, password} = req.body
    try{
        const user = new User(req.body)
        const userFind = await User.findOne({email})
        if(!userFind){
            user.password = await hashPassword(password)
            await user.save()
            return res.status(201).json({message:'Usuário salvo com sucesso!'})
        }else{
            return res.status(401).json({message: 'Erro: Usuário já cadastrado'})
        }

    }catch(error){
        console.log('Erro de registro: ',error)
    }
})

const port = process.env.PORT|| 3001

mongoConnection()
httpServer.listen(port, ()=>{console.log('Servidor Express Iniciado!')})