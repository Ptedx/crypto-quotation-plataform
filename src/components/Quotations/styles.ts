import { StyleSheet } from "react-native"

export const histStyles = StyleSheet.create({
    contianer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    item:{
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
        color:'white',
        fontSize: 16,
        fontWeight:'bold'
    },
    positive:{
        color:'green',
        textAlign: 'right',
    },
    negative:{
        color:'red',
        textAlign: 'right',
    },
    textRow:{
        flexDirection: 'row',
        gap:20,
        justifyContent:'center',
        alignItems:'center'
    },
    coinRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
})
