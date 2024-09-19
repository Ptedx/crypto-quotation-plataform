import { detailStyles } from "./styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { View,Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from "react-native"
import { rootTypes } from "../../types/types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import axios from "axios"
import { LoadingComponent } from "../../components/loadingComponent"
import { Item } from "../../components/Item"
import { Graphic } from "../../components/GraphComponent"

type navigationProps = NativeStackScreenProps<rootTypes, 'Details'>


export function Details({navigation, route}:navigationProps){
    const {coinId, coinName, coinImage} = route.params
    const [coinData, setCoinData]= useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [period, setPeriod] = useState<number>(180)
    useEffect(()=>{
        
        async function getCoinInfos(){
            try{
                const response = await axios.get(`http://10.0.0.196:3002/coins/${coinId}`)
                    navigation.setOptions({
                        
                        headerTitle:`${coinName.toUpperCase()} (${(response.data.symbol).toUpperCase()}) `
                    })
                setCoinData(response.data)
            }catch(error){
                console.log('Erro ao buscar a moeda:'+error)
            }finally{
                setIsLoading(false)
                
            }
        }

        getCoinInfos()
    },[])

    const formatCurrency = (value: number | string) => {
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD', 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 3,
        }).format(numericValue)
      };

    if (isLoading) {
        return (
          <LoadingComponent />
        )
      }
    
    return(
        <SafeAreaView style={detailStyles.contianer}>

                <View style={detailStyles.infos}>
                    <View style={detailStyles.price}>
                        <Text style={detailStyles.title}>{formatCurrency(coinData.market_data.current_price.usd)}</Text>
                        <Text style={coinData.market_data.price_change_percentage_24h> 0? detailStyles.up: detailStyles.down}>
                            {coinData.market_data.price_change_percentage_24h >= 0? 
                            `+${formatCurrency(coinData.market_data.price_change_24h)} (+${(coinData.market_data.price_change_percentage_24h).toFixed(2)}%)`
                            :`${formatCurrency(coinData.market_data.price_change_24h)} (${(coinData.market_data.price_change_percentage_24h).toFixed(2)}%)`}
                        </Text>
                    </View>
                    <Image source={coinImage}
                        style={{width:50, height: 50}}
                    />
                </View>
                
                <Graphic 
                    coinId={coinId} 
                    days={period}
                />

                <View style={[detailStyles.buttons,{marginVertical:10}]}>
                    <TouchableOpacity style={detailStyles.btn} onPress={()=>setPeriod(7)}>
                        <Text style={detailStyles.text}>7D</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={detailStyles.btn} onPress={()=>setPeriod(30)}>
                        <Text style={detailStyles.text}>1M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={detailStyles.btn} onPress={()=>setPeriod(90)}>
                        <Text style={detailStyles.text}>3M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={detailStyles.btn} onPress={()=>setPeriod(180)}>
                        <Text style={detailStyles.text}>6M</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[detailStyles.title, 
                    {textAlign: 'center',marginVertical: 10, fontSize:20}]}>MAIS INFORMAÇÕES
                </Text>

                <ScrollView style={{flex:1, width:'95%'}}>
                    <Item 
                        desc="Preço (7d)"
                        percentage={coinData.market_data.price_change_percentage_7d} 
                        data={coinData.market_data.sparkline_7d.price[0]> 1? 
                            `${formatCurrency((coinData.market_data.sparkline_7d.price[0]).toFixed(4))}`
                            : formatCurrency(coinData.market_data.sparkline_7d.price[0])}
                    />
                    <Item desc="MarketCap (Total)" data={coinData.market_data.market_cap.usd > 1e12?
                            `${formatCurrency(coinData.market_data.market_cap.usd/1e12)} T`
                            :coinData.market_data.market_cap.usd > 1e9?
                            `${formatCurrency(coinData.market_data.market_cap.usd/1e9)} B`
                            :`${formatCurrency(coinData.market_data.market_cap.usd/1e6)} M`}
                        />
                     <Item 
                        desc="MarketCap (24hr)" 
                        percentage={coinData.market_data.market_cap_change_percentage_24h}
                        data={coinData.market_data.market_cap_change_24h >= 1000000000?
                        `$${(coinData.market_data.market_cap_change_24h/1000000000).toFixed(3)} B`:
                        `$${(coinData.market_data.market_cap_change_24h/1000000).toFixed(3)} M`}
                    />

                    

                    <Item desc="Volume total" data={coinData.market_data.total_volume.usd > 1000000000?
                        `${formatCurrency(coinData.market_data.total_volume.usd/1000000000)} B`:
                        `${formatCurrency(coinData.market_data.total_volume.usd/1000000)} M`}
                    />
                   
                    <Item desc="Em circulação" data={(coinData.market_data.circulating_supply).toFixed(0)}/>
                    <Item desc="Quantidade Máxima" data={coinData.market_data.max_supply? 
                        (coinData.market_data.max_supply).toFixed(0): 'N/A'}/>

                    <Item desc="Ranking" data={coinData.market_data.market_cap_rank}/> 
                </ScrollView>
        </SafeAreaView>
    )
}
