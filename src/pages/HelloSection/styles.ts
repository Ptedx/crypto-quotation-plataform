import { StyleSheet } from "react-native"
import { hp, wp } from "../../components/Responsive"


export const contactStyles = StyleSheet.create({
    contianer:{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    img:{
        width: '100%',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    textDiv:{
        width:wp(100),
        paddingTop:hp(10),
        flex:1,
        alignItems:'center',
    },
    bottom_square:{
        width:500,
        height:500,
        position: 'absolute',
        bottom: -250,
        left: -250,
    },
    top_square:{
        width:500,
        height:500,
        position: 'absolute',
        top: -250,
        right: -250,
    },
    title:{
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:hp(5),
        marginTop: -30,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    text:{
        color:'#B0B0B0',
        fontSize:hp(1.7),
        fontWeight: 'bold',
    },
    btn:{
        backgroundColor:'#000000',
        width:wp(80),
        borderRadius: 16,
        marginTop: hp(10),
        marginBottom: 20,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
        borderColor:'#00FFAA',
        borderWidth: 3
        
    },
})
