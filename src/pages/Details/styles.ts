import { StyleSheet } from "react-native"

export const detailStyles = StyleSheet.create({
    contianer:{
        flex: 1,
        backgroundColor: '#0e0e0e',
        alignItems: 'center',
        width:'100%',
    },
    infos:{
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:30,
    },
    price:{
        alignItems:'flex-start',
        justifyContent:'center',
        marginBottom: 20
    },
    text:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    up:{
        color:'green',
        fontWeight: 'bold',
        paddingHorizontal:20,
    },
    down:{
        color:'red',
        fontWeight: 'bold',
        paddingHorizontal:20,
    },
    title:{
        fontSize: 40,
        color: '#A6C5FF',
        fontWeight: 'bold',
    },
    graphic:{
        marginBottom: 20
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-around',
        gap:50,
        marginBottom:10,
    },
    btn:{
        borderColor:'#3C4D80',
        paddingHorizontal:10,
        borderWidth: 1,
        borderRadius:12
    },
    
})
