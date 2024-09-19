import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import { cardStyles } from './styles';
import { coinsData } from '../../models/cyptoInfos';
import { Sparkline } from '../sparkline';

interface CryptoData {
    dataApi:coinsData[]
  }
export function CryptoCard({ dataApi }:CryptoData){
    const topTrending = dataApi.slice(0,10)

    function truncate(number:string){
      const num = parseFloat(number)
      return num < 1 && num > -1? (num).toFixed(4) : (num).toFixed(2)
    }
    return (
      <FlatList
            data={topTrending}
            keyExtractor={(item)=>item.symbol}
            horizontal
            renderItem={({item})=>(
                    <View style={cardStyles.card}>

                      
                        <View style={cardStyles.currencyInfos}>
                          <View style={cardStyles.priceInfos}>
                            <Image 
                                source={{uri: item.image}}
                                style={{width:40, height: 40, borderRadius: 50}}
                            />

                            <Text style={cardStyles.currency}>{item.symbol.toUpperCase()}</Text>
                          </View>

                            <View style={cardStyles.priceInfos}>
                              <Text style={cardStyles.price}>${truncate(item.current_price)}</Text>
                                <Text style={[cardStyles.change, parseFloat(item.price_percentage_24h) > 0 ? 
                                  cardStyles.positiveChange : cardStyles.negativeChange]}>
                                  {truncate(item.price_percentage_24h)}%
                              </Text> 
                            </View>

                      </View>
                      <Sparkline dataAPI={item.sparkline_in_7d}/>

                     
                  </View>

            )}
      />
    )
}
  /**/
