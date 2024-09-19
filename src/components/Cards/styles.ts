import { StyleSheet } from "react-native"

export const cardStyles = StyleSheet.create({
    // Estilos para cada elemento do card
    card: {
      alignItems: 'center',
      gap:20,
      paddingHorizontal: 20,
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
