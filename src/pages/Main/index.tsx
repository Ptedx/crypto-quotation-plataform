import { mainStyles } from "./styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { Menu } from "../../components/Menu"
import { Balance } from "../../components/Balance"
import { View } from "react-native"
import { History } from "../../components/Quotations"
import { CryptoCard } from "../../components/Cards"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { rootTypes } from "../../types/types"
import { TopBlur } from "../../components/background_blur"
import { useEffect, useState } from "react"
import axios from "axios"
import { CoinsData } from "../../models/cyptoInfos"
import { LoadingComponent } from "../../components/loadingComponent"
import AsyncStorage from '@react-native-async-storage/async-storage';

export type navigatorProps = NativeStackScreenProps<rootTypes,'MainTabs'>


export function MainPage({navigation, route}:navigatorProps){    
    const name = route.params?.name
    const [data, setData] = useState<CoinsData | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)

    async function getInfos(){
        try{
            const response = await axios.get(`https://crypto-quotation-plataform.onrender.com/coins`)
            const dataString = JSON.stringify(response.data)
            await AsyncStorage.setItem('@Coins', dataString)
            await AsyncStorage.setItem('@last_update', String(Date.now()))
            
            setData(response.data)
            setLoaded(true)
        }catch(err){
            getCache()
            alert(`Erro: Falha ao acessar o servidor! Verifique sua conexão com a internet e tente novamente.`)
            console.log('Erro ao buscar moedas: ',err)
        }
    } 

    function fiveMinutesPassed(last_update:string){
        const fiveMinutes = 5*60*1000
        return (Date.now() - parseFloat(last_update)) >= fiveMinutes? true:false 
    }

    

    async function getCache(){
        const result = await AsyncStorage.getItem('@Coins')
        if(result){
            setData(JSON.parse(result!))
            setLoaded(true)
        }else{
            console.log('Não existe dados na cache!')
        }
    }

    useEffect(()=>{
        async function checkData(){
            const insertTime = await AsyncStorage.getItem('@last_update')
            if(insertTime){
                if(fiveMinutesPassed(insertTime)){
                    return getInfos()
                }
                return getCache()
            }
            return getInfos()
        }

        checkData()
    },[])
    
    if(!loaded){
        return <LoadingComponent />
    }
    return(
        <SafeAreaView style={mainStyles.contianer}>
                <View style={mainStyles.contianer}>
                    <TopBlur />
                    <Menu navigation={navigation} name={name!} />
                    <Balance />
                        <CryptoCard dataApi={data!} />
                </View>
            <History navigation={navigation} dataAPI={data!}/>
        </SafeAreaView>
    )
}
