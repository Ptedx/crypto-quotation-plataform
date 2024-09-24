import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, } from "react-native"
import { histStyles } from "./styles"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { rootTypes } from "../../types/types";

type HistoryProps = {
    navigation: NativeStackNavigationProp<rootTypes, 'MainTabs'>
    dataAPI: any
  };

export function History({navigation, dataAPI}:HistoryProps){

    function truncate(number:number){

        if(number > -0.0001 && number < 0.0001){
            return (number).toFixed(7)
        }
        if (number <= 1 && number >= -1){
            return (number).toFixed(4)
        }
        return (number).toFixed(2)
    }

    return(
        <View style={histStyles.contianer}>
            <Text style={StyleSheet.compose(histStyles.text,{marginBottom:20, fontSize: 18})}>
                MOST TRENDING COINS
            </Text>

            <FlatList 
                style={{width: '95%'}}
                data={dataAPI}
                renderItem={({item})=>(
                    <TouchableOpacity 
                        style={histStyles.item} 
                        onPress={()=>navigation.navigate('Details',
                            {data: item})}
                    >
                        <View style={histStyles.coinRow}>
                            <Image 
                                source={{uri: item.image}}
                                style={{width:50, height:50, borderRadius:50}}
                            />
                            <Text style={histStyles.text}>{(item.symbol).toUpperCase()}</Text>
                        </View>
                        
                        <View style={histStyles.textRow}>
                            <Text style={histStyles.text}>${truncate(item.current_price)}</Text>
                            <Text style={
                                [histStyles.text,
                                item.price_change_percentage_24h >= 0 ? histStyles.positive : histStyles.negative]}>
                                {item.price_change_percentage_24h > 0? `+${truncate(item.price_change_percentage_24h)}`
                                :truncate(item.price_change_percentage_24h)}%
                            </Text>
                        </View>
                    </TouchableOpacity>
                    )}
                keyExtractor={(item)=>item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
