import { StyleSheet } from "react-native"


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
        marginTop:10
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
        fontSize:44,
        marginTop: -30,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    text:{
        color:'#B0B0B0',
        fontSize:16,
        fontWeight: 'bold',
    },
    btn:{
        backgroundColor:'#000000',
        borderRadius: 16,
        marginTop: 60,
        marginBottom: 20,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
        borderColor:'#00FFAA',
        borderWidth: 3
        
    },
})
