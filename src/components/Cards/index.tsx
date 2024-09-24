import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { cardStyles } from './styles';
import { coinsData } from '../../models/cyptoInfos';
import { Sparkline } from '../sparkline';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { rootTypes } from '../../types/types';
interface CryptoData {
    navigation: NativeStackNavigationProp<rootTypes, 'MainTabs'>
    dataApi:coinsData[]
}

export function CryptoCard({ navigation ,dataApi }:CryptoData){
    const topTrending = dataApi.slice(0,10)

    function truncate(number:number){
      return number < 1 && number > -1? (number).toFixed(4) : (number).toFixed(2)
    }
    return (
      <FlatList
            data={topTrending}
            keyExtractor={(item)=>item.symbol}
            horizontal
            renderItem={({item})=>(
                    <TouchableOpacity 
                      style={cardStyles.card}
                      onPress={()=>navigation.navigate('Details',
                        {data: item})}
                    >
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
                                <Text style={[cardStyles.change,item.price_change_percentage_24h> 0 ? 
                                  cardStyles.positiveChange : cardStyles.negativeChange]}>
                                  {truncate(item.price_change_percentage_24h)}%
                              </Text> 
                            </View>

                      </View>
                      <Sparkline dataAPI={item.sparkline_in_7d.price}/>
                  </TouchableOpacity>

            )}
      />

    )
}
