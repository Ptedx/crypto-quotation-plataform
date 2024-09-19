import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import {Svg, Path, Defs, LinearGradient, Stop} from 'react-native-svg'
import axios from 'axios'

type dataProps = [number, number][]


export function Graphic({coinId, days}:{coinId:string,days:number}){
  const [coinData, setCoinData] = useState<dataProps>([])
  const [dataPeriod, setDataPeriod] = useState<dataProps>([])
  useEffect(()=>{
    async function getPrices(){
      try{
        const response = await axios.get(`http://10.0.0.196:3002/charts/${coinId}`)
        setCoinData(response.data)
        setDataPeriod(response.data.slice(0,180))
      }catch(err){
        console.log('Erro no gráfico: ',err)
      }
    }
    getPrices()
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