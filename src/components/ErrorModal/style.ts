import { StyleSheet } from "react-native";

export const errorModalStye = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    errorDiv:{
        position:'relative',
        paddingVertical:50,
        width:'75%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1E1E1E',
        borderWidth:1,
        borderColor:'#B91C1C',
        borderRadius:12,
        padding: 15,
    },
    close:{
        position: 'absolute',
        right: 25,
        top:25,
        width:40,
    },
    line:{
        width: '100%',
        height:10,
        backgroundColor:'#F87171',
        borderRadius:12,
    },
    line1:{
        transform: [{translateY:10},{rotate: '45deg'}]
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
        marginTop:20,
        color:'#E5E7EB',
        textAlign:'center',
        fontSize:18
    },
})