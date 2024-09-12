import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface btnProps{
    content:string,
    action: ()=>void
}

export function Btn({content, action}:btnProps){
    return(
        <TouchableOpacity style={btnStyles.btn} onPress={action}>
            <Text style={btnStyles.text}>
                {content}
            </Text>
        </TouchableOpacity>
    )
}

const btnStyles= StyleSheet.create({
    btn:{
        backgroundColor:'#3C4D80',
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
        color:'#FFFFFF',
        fontSize:20,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})