import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNetwork } from "../../hooks/useNetwork";

interface btnProps{
    content:string,
    action: ()=>void,
    change: ()=>void,
}

export function Btn({content, action, change}:btnProps){
    const {isConnected} = useNetwork()
    return(
        <TouchableOpacity style={btnStyles.btn} onPress={isConnected? action: change}>
            <Text style={btnStyles.text}>
                {content}
            </Text>
        </TouchableOpacity>
    )
}

const btnStyles= StyleSheet.create({
    btn:{
        backgroundColor:'#00FFAA',
        borderRadius: 16,
        marginTop:10,
        marginBottom: 20,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingVertical: 15,
        paddingHorizontal:15,
        width:'80%',
    },
    text:{
        color:'green',
        fontSize:20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})