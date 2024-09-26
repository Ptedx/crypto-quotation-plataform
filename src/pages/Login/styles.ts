import { StyleSheet } from "react-native"
import { hp, wp } from "../../components/Responsive"

export const infoStyles = StyleSheet.create({
    contianer:{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        position:'relative',
    },
    loginArea:{
        width: wp(100),
        flex:1,
        marginTop: hp(10),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input:{
        backgroundColor: '#333333',
        width: wp(80),
        borderRadius: 12,
        padding:wp(5),
        paddingVertical: wp(3),
        marginBottom: 10,
        color: 'white'
    },
    text:{
        color:'#B0B0B0',
        fontWeight: 'bold',
        fontSize: wp(3.5),
    },
    errorText:{
        color:'red', 
        width: '100%', 
        paddingHorizontal:wp(12)
    },
    title:{
        marginBottom: hp(1),
        fontSize: wp(7),
        color:'#FFFFFF',
    },
    subtitle:{
        fontSize: wp(4),
        marginBottom: hp(3)
    }
    
})
