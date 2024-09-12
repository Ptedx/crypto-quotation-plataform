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
        backgroundColor: '#A6C5FF',
        width: '80%',
        borderRadius: 12,
        padding:10,
        marginBottom: 20,
    },
    text:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title:{
        marginBottom: 5,
        fontSize:30,
        color:'#A6C5FF',
    }
})
