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

export type navigatorProps = NativeStackScreenProps<rootTypes,'MainTabs'>

export function MainPage({navigation, route}:navigatorProps){
    const name = route.params?.name

    return(
        <SafeAreaView style={mainStyles.contianer}>
                <View style={mainStyles.contianer}>
                    <TopBlur image={require('../../img/blur_blue.png')}/>
                    <Menu name={name!} />
                    <Balance />
                    <ScrollView horizontal>
                        <CryptoCard currency="BTC" price="$ 254.54" change={3} />
                        <CryptoCard currency="USD" price="$ 232.25" change={-1} />
                        <CryptoCard currency="ETH" price="$ 5832.25" change={12} />
                        <CryptoCard currency="DOGE" price="$ 338.85" change={34} />
                    </ScrollView>
                </View>
            <History navigation={navigation}/>
        </SafeAreaView>
    )
}
