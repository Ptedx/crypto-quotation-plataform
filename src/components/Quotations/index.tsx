import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, } from "react-native"
import { histStyles } from "./styles"
import { data_api } from "../../data_api/data_api"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { rootTypes } from "../../types/types";

type HistoryProps = {
    navigation: NativeStackNavigationProp<rootTypes, 'MainTabs'>;
  };

export function History({navigation}:HistoryProps){

    return(
        <View style={histStyles.contianer}>
            <Text style={StyleSheet.compose(histStyles.text,{marginBottom:20, color:'#A6C5FF'})}>
                MOST TRENDING COINS
            </Text>

            <FlatList 
                style={{width: '95%'}}
                data={data_api}
                renderItem={({item})=>(
                    <TouchableOpacity 
                        style={histStyles.item} 
                        onPress={()=>navigation.navigate('Details',
                            {coinId: item.coinId, coinName:item.coinName, coinImage: item.image, coinPercentage: item.pricePercetage})}
                    >
                        <View style={histStyles.coinRow}>
                            <Image 
                                source={item.image}
                                style={{width:50, height:50}}
                            />
                            <Text style={histStyles.text}>{item.coinName}</Text>
                        </View>
                        <View style={histStyles.textRow}>
                            <Text style={histStyles.text}>${item.price}</Text>
                            <Text style={
                                [histStyles.text,
                                item.pricePercetage >= 0 ? histStyles.positive : histStyles.negative]}>
                                {item.pricePercetage > 0? `+${item.pricePercetage}`:item.pricePercetage}%
                                </Text>

                        </View>
                    </TouchableOpacity>
                    )}
                keyExtractor={(item)=>item.coinName}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
