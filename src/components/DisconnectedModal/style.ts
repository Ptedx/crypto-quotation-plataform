import { StyleSheet } from "react-native";

export const errorModalStye = StyleSheet.create({
    container:{
        position:'absolute',
        top:0, 
        height: 80, 
        width:'100%', 
        zIndex:2,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonBg:{
        
    },
    errorDiv:{
        flexDirection:'row',        
        width:'80%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#1E1E1E',
        borderWidth:1,
        borderColor:'#B91C1C',
        borderRadius:12,
        padding: 15,
        gap:15,
    },
    close:{
        width:40,
    },
    line:{
        width: '75%',
        height:5,
        backgroundColor:'#F87171',
        borderRadius:12,
    },
    line1:{
        transform: [{translateY:5},{rotate: '45deg'}]
    },
    line2:{
        transform: [{rotate: '-45deg'}]
    },
    textArea:{
        width:'100%',
    },
    title:{
        color:'#B91C1C',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:40,
    },
    subTitle:{
        marginTop:10,
        color:'#F87171',
        textAlign:'center',
        fontSize:22
    },
    text:{
        color:'#E5E7EB',
        textAlign:'center',
        fontSize:18
    },
})