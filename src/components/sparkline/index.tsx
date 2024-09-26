import Svg, { Path } from "react-native-svg";
import * as d3 from 'd3'
import { View } from "react-native";
import { hp, wp } from "../Responsive";
interface sparkProps{
    dataAPI: number[]
}

export function Sparkline({dataAPI}: sparkProps){

    const width= wp(100)
    const height = hp(7)

    const formatedData = dataAPI.map((item,index)=>([index, item] as [number,number]))


    const xScale = d3.scaleLinear()
    .domain([(d3.min(formatedData, d=>d[0])) as number, d3.max(formatedData, d=>d[0]) as number])
    .range([0, 300])
    
    const yScale = d3.scaleLinear()
    .domain([(d3.min(formatedData, d=>d[1])) as number, d3.max(formatedData, d=>d[1]) as number])
    .range([height, 0])

    const lineGenerator = d3.line()
    .x(d=>xScale(d[0]))
    .y(d=>yScale(d[1]))

    const pathLine = lineGenerator(formatedData)

    return(
        <View style={{ width:'100%', paddingBottom:hp(2)}}>
            <Svg width={'100%'} height={height}>
                <Path d={pathLine!} stroke={'#00ffaa'} fill={'none'} strokeWidth={2}/>
            </Svg>
        </View>
    )
}