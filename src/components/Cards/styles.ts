import { StyleSheet } from "react-native"

export const cardStyles = StyleSheet.create({
    // Estilos para cada elemento do card
    card: {
      alignItems: 'center',
      paddingHorizontal: 20,
      height: 150,
      width: 300,
      marginBottom: 10,
      backgroundColor: '#1e1e1e',
      borderRadius: 10,
      marginHorizontal: 10,
    },
    currencyInfos:{
        marginTop: 20,
        flexDirection:'row',
        gap: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width:'100%',
    },
    currency: {
      color: '#A6C5FF',
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
        justifyContent: 'space-between',
        width: '100%',
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
