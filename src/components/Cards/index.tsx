import { View, Text, Image } from 'react-native';
import { cardStyles } from './styles';

interface CryptoData {
    currency: string;
    price: string;
    change: number;
  }
  export function CryptoCard({ currency, price, change }:CryptoData){
    return (
      <View style={cardStyles.card}>
        <View style={cardStyles.currencyInfos}>
            <Image 
                source={require('../../img/AllCoins-logo.png')}
                style={{width:40, height: 40}}
            />
            <Text style={cardStyles.currency}>{currency}</Text>
        </View>
        <View>
            <Text style={cardStyles.price}>
                Gráfico futuro aqui
            </Text>
        </View>
        <View style={cardStyles.priceInfos}>
            <Text style={cardStyles.price}>{price}</Text>
            <Text style={[cardStyles.change, change > 0 ? cardStyles.positiveChange : cardStyles.negativeChange]}>
            {change}%
            </Text>
        </View>
      </View>
    );
  };
