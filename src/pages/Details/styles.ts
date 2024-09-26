import { StyleSheet } from "react-native"
import { hp, wp } from "../../components/Responsive"

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
        color:'#B0B0B0',
        fontWeight: 'bold',
        fontSize: hp(2)
    },
    up:{
        color:'#32CD32',
        fontWeight: 'bold',
        paddingHorizontal:20,
    },
    down:{
        color:'#FF5555',
        fontWeight: 'bold',
        paddingHorizontal:20,
    },
    title:{
        fontSize: wp(7),
        color: 'white',
        fontWeight: 'bold',
    },
    graphic:{
        marginBottom: 20,
        justifyContent:'center',
        alignItems:'center',
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        width:wp(80),
        gap:50,
        marginBottom:10,
    },
    btn:{
        borderColor:'#00FFAA',
        paddingHorizontal:10,
        borderWidth: 1,
        borderRadius:12
    },
    
})
