import { StyleSheet } from "react-native"
import { hp } from "../Responsive";

export const cardStyles = StyleSheet.create({
    // Estilos para cada elemento do card
    container:{
      height:hp(20),
      marginBottom:hp(2),
    }
    ,card: {
      alignItems: 'center',
      gap:20,
      paddingHorizontal: hp(2),
      width: 300,
      backgroundColor: '#1e1e1e',
      borderRadius: 10,
      height:hp(18.5),
      marginHorizontal: 10,
    },
    currencyInfos:{
        paddingTop:hp(2),
        flexDirection:'row',
        gap: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
    },
    currency: {
      color: '#00FFAA',
      fontSize: 18,
      fontWeight: 'bold'
    },
    price: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    priceInfos:{
        flexDirection: 'row',
        alignItems:'center',
        gap:10,
    },
    change: {
      color: '#fff',
      fontSize: 18,
      fontWeight:'bold',
    },
    positiveChange: {
      color: 'green',
    },
    negativeChange: {
      color: 'red',
    },
  });
