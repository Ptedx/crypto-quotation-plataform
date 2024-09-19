import { StyleSheet } from "react-native"

export const priceStyles = StyleSheet.create({
    contianer:{
        marginTop:20,
        width:'100%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 20,
        
    },
    modalContainer:{
        width:'100%',
        position: 'relative',
        flex:1,
        height:'100%',
    },
    modalOpacity:{
        width:'50%',
        position: 'absolute',
        flex:1,
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalItems:{
        width:'50%',
        position: 'absolute',
        flex:1,
        height:'100%',
        right:0,
        backgroundColor:'#1e1e1e',
        justifyContent:'flex-end'
    },
    text:{
        color:'#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    title:{
        color:'#00FFAA',
        fontSize: 26,
        fontWeight: 'bold',
    }
})
