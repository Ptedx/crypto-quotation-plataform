import { StyleSheet } from "react-native"

export const infoStyles = StyleSheet.create({
    contianer:{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        position:'relative',
    },
    loginArea:{
        width: '100%',
        flex:1,
        marginTop: 150,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input:{
        backgroundColor: '#333333',
        width: '80%',
        borderRadius: 12,
        padding:15,
        paddingVertical: 20,
        marginBottom: 10,
        color: 'white'
    },
    text:{
        color:'#B0B0B0',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title:{
        marginBottom: 5,
        fontSize:30,
        color:'#FFFFFF',
    }
})
