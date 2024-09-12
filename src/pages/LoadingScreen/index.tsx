import { View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { rootTypes } from "../../types/types";
import { useEffect } from "react";
import { loadingStyles } from "./styles";
import * as SecureStorage from 'expo-secure-store'
import { CommonActions } from "@react-navigation/native";


type nagivateProps = NativeStackScreenProps<rootTypes, 'Loading'>

export function Loading({navigation}: nagivateProps){

    function resetStack(tab:string){
        navigation.dispatch(
            CommonActions.reset({
                index:0,
                routes:[{name: tab}]
            })
        )
    }

    useEffect(()=>{
        async function sectionCheck(){

            const data = await SecureStorage.getItemAsync('AuthToken')
            if(data){
                const {name} = JSON.parse(data)
                resetStack('MainTabs')
                navigation.navigate('MainTabs',{name: name})
            }
            else{
                resetStack('HelloSection')
                navigation.navigate('HelloSection')
            }
        }
        sectionCheck()
    },[])

    return(
        <View style={loadingStyles.container}>
            <Image 
                source={require('../../img/coins-main.png')}
                resizeMode="contain"
                style={{width: 150, height:150,marginVertical: 20}}
            />
        </View>
    )
}