import { mainStyles } from "./styles"
import { SafeAreaView } from "react-native-safe-area-context"
import { Menu } from "../../components/Menu"
import { Balance } from "../../components/Balance"
import { ScrollView, View,} from "react-native"
import { History } from "../../components/Quotations"
import { CryptoCard } from "../../components/Cards"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { rootTypes } from "../../types/types"
import { TopBlur } from "../../components/background_blur"
import { useEffect, useState } from "react"
import axios from "axios"
import { CoinsData } from "../../models/cyptoInfos"
import { LoadingComponent } from "../../components/loadingComponent"

export type navigatorProps = NativeStackScreenProps<rootTypes,'MainTabs'>

export function MainPage({navigation, route}:navigatorProps){    
    const name = route.params?.name
    const [data, setData] = useState<CoinsData | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(()=>{
        async function getInfos(){
            try{
                const response = await axios.get(`http://10.0.0.196:3002/coins`)
                setData(response.data)
                setLoaded(true)
            }catch(err){
                console.log('Erro ao buscar moedas: ',err)
            }
        } 
        getInfos()
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
