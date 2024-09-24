import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import {Svg, Path, Defs, LinearGradient, Stop} from 'react-native-svg'
import axios from 'axios'
import { LoadingComponent } from '../loadingComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
type dataProps = [number, number][]

interface graphicProps{
  coinId: string,
  days: number,
  changeModal: ()=>void
}

export function Graphic({coinId, days, changeModal}:graphicProps){
  const [coinData, setCoinData] = useState<dataProps>([])
  const [dataPeriod, setDataPeriod] = useState<dataProps>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  async function getPrices(){
    try{
      const response = await axios.get(`http://10.0.0.196:3002/charts/${coinId}`)

      const graphicData = JSON.stringify(response.data)
      await AsyncStorage.setItem(`@last_${coinId}_graphic_update`, String(Date.now()))
      await AsyncStorage.setItem(`@Coin_${coinId}`, graphicData)
      
      setCoinData(response.data)
      setDataPeriod(response.data.slice(0,180))
      setIsLoading(false)
    }catch(err){
      getCache()
      changeModal()
      console.log('Erro no gráfico: ',err)
    }
  }

  function oneHourPassed(last_update:string){
    const fiveHours = 5*60*60*1000
    return (Date.now() - parseFloat(last_update)) >= fiveHours? true:false 
  }

  async function getCache(){
    const data = await AsyncStorage.getItem(`@Coin_${coinId}`)
    if(data){
      setCoinData(JSON.parse(data))
      setDataPeriod(JSON.parse(data).slice(0,180))
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    async function checkData() {
      const existCache = await AsyncStorage.getItem(`@last_${coinId}_graphic_update`)
      if(existCache){
        if(oneHourPassed(existCache)){
          return getPrices()
        }
        return getCache()
      }
      getPrices()
    }
    checkData()
  },[])


  useEffect(()=>{
    function changeGraph(){
      const periodData = coinData.slice(0,days)
      setDataPeriod(periodData)
    }
    changeGraph()
  },[days])

  const { width: screenWidth } = Dimensions.get('window');
  const height:number = 300 

  const xMin: Date | undefined = d3.min(dataPeriod, (d) => new Date(d[0]))
  const xMax: Date | undefined = d3.max(dataPeriod, (d) => new Date(d[0]))

  const yMin: number | undefined = d3.min(dataPeriod, d => d[1])
  const yMax: number | undefined = d3.max(dataPeriod, d => d[1])

  const xScale = d3.scaleTime()
  .domain([xMin as Date, xMax as Date])
  .range([0,screenWidth])

  const yScale = d3.scaleLinear()
    .domain([yMin as number, yMax as number])
    .range([height, 0])

  const lineGenerator = d3.line()
    .x(d=> xScale(new Date(d[0])))
    .y(d=>yScale(d[1]))

  const pathline = lineGenerator(dataPeriod)
  
  const areaGenerator = d3.area()
    .x(d=> xScale(new Date(d[0])))
    .y0(height)
    .y1(d=>yScale(d[1]))


  const patharea = areaGenerator(dataPeriod)

  if(isLoading){
    return <LoadingComponent />
  }

  return(
    <View style={{ width:'95%'}}>
        <Svg width={screenWidth} height={height}> 
          <Defs>
            <LinearGradient id='graphId' x1='0%' y1='0%' x2='0%' y2='100%'>
              <Stop offset='0%' stopColor='#00ffaa' stopOpacity={0.8}/>
              <Stop offset='100%' stopColor='#00ffaa' stopOpacity={0}/>
            </LinearGradient>
          </Defs>
            <Path d={pathline!} fill='none' stroke='#00ffaa' strokeWidth={2}/>
            <Path d={patharea!} fill='url(#graphId)'/>
        </Svg>
    </View>
  )
}