import { detailStyles } from "./styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { View,Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from "react-native"
import { rootTypes } from "../../types/types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import axios from "axios"
import { LoadingComponent } from "../../components/loadingComponent"
import { BottomBlur, TopBlur } from "../../components/background_blur"
import { Item } from "../../components/Item"

type navigationProps = NativeStackScreenProps<rootTypes, 'Details'>

export function Details({navigation, route}:navigationProps){
    const {coinId, coinName, coinImage, coinPercentage} = route.params
    const [coinData, setCoinData]= useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(()=>{
        
        
        async function getCoinInfos(){
            try{

                const response = await axios.get(
                    `https://coingecko.p.rapidapi.com/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=true`,
                    {
                      headers:{
                        'x-rapidapi-host': 'coingecko.p.rapidapi.com',
                        'x-rapidapi-key': 'c5445751b2msh2e0b3b82db53c50p1661bejsnf0d23522991d'
                      }
                    });
                
                    navigation.setOptions({
                        headerTitle:`${coinName.toUpperCase()} (${(response.data.symbol).toUpperCase()})`
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

    if (isLoading) {
        return (
          <LoadingComponent />
        )
      }
    

    return(
        <SafeAreaView style={detailStyles.contianer}>
            <TopBlur />
                <View style={detailStyles.infos}>
                    <View style={detailStyles.price}>
                        <Text style={detailStyles.title}>$ {coinData.market_data.current_price.usd as number}</Text>
                        <Text style={coinData.market_data.price_change_percentage_24h> 0? detailStyles.up: detailStyles.down}>
                            {coinData.market_data.price_change_percentage_24h >= 0? `+${coinData.market_data.price_change_24h}$ (+${coinData.market_data.price_change_percentage_24h}%)`
                            :`${coinData.market_data.price_change_24h}$ (${coinData.market_data.price_change_percentage_24h}%)`}</Text>
                    </View>
                    <Image source={coinImage}
                        style={{width:50, height: 50}}
                    />
                </View>
                <View style={detailStyles.graphic}>
                    <Image 
                    source={require('../../img/darkgraphic.jpg')}
                    resizeMode="contain"
                    style={{height:250}}
                    />
                </View>
                <View style={detailStyles.buttons}>
                    <TouchableOpacity style={detailStyles.btn}>
                        <Text style={detailStyles.text}>7D</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={detailStyles.btn}>
                        <Text style={detailStyles.text}>1M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={detailStyles.btn}>
                        <Text style={detailStyles.text}>3M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={detailStyles.btn}>
                        <Text style={detailStyles.text}>6M</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[detailStyles.title, 
                    {textAlign: 'center',marginBottom: 20, fontSize:30}]}>MAIS INFORMAÇÕES</Text>
                <ScrollView style={{flex:1, width:'95%'}}>
                    <Item desc="MarketCap (24hr)" data={coinData.market_data.market_cap_change_24h}/>
                    <Item desc="Preço (7d)" data={coinData.market_data.sparkline_7d.price[0]> 1? 
                        (coinData.market_data.sparkline_7d.price[0]).toFixed(4): coinData.market_data.sparkline_7d.price[0]}/>
                    <Item desc="Volume total" data={coinData.market_data.total_volume.usd}/>
                    <Item desc="Em circulação" data={coinData.market_data.circulating_supply}/>
                    <Item desc="Quantidade Máxima" data={coinData.market_data.max_supply? coinData.market_data.max_supply: 'N/A'}/>
                    <Item desc="Ranking" data={coinData.market_data.market_cap_rank}/>
                </ScrollView>
        </SafeAreaView>
    )
}
