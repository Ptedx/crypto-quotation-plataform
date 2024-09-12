import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface btnProps{
    desc:string,
    data: string | number
}

export function Item({desc, data}:btnProps){
    return(
        <View style={btnStyles.coinInfo}>
            <Text style={btnStyles.text}>
                {desc}
            </Text>
            <Text style={btnStyles.text}>
                {data}
            </Text>
        </View>
    )
}

const btnStyles= StyleSheet.create({
    coinInfo:{
        backgroundColor: '#1e1e1e',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        height: 70,
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 10,
        borderRadius: 12,
    },
    text:{
        color:'#FFFFFF',
        fontSize:20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})