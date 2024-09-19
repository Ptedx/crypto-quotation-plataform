import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface btnProps{
    desc:string,
    data: string | number
    percentage?: number
}

export function Item({desc, data, percentage}:btnProps){
    const positive = percentage! > 0? true:false
    return(
        <View style={btnStyles.coinInfo}>
            <Text style={btnStyles.text}>
                {desc}
            </Text>
            <View style={{flexDirection:'row', gap: 10}}>
                <Text style={btnStyles.text}>
                    {data}
                </Text>
                <Text style={[btnStyles.text, positive? btnStyles.up: btnStyles.down]}>
                    {percentage? 
                    positive?`+${percentage.toFixed(2)} %`: `${percentage.toFixed(2)} %`
                    :''}
                </Text>
            </View>

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
        fontSize:18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    up:{
        color:'green'
    },
    down:{
        color:'red'
    }
})