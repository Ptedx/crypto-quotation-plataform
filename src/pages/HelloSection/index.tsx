import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { rootTypes } from "../../types/types"
import { contactStyles } from "./styles"
import { BottomBlur, TopBlur } from "../../components/background_blur"
import { hp, wp } from "../../components/Responsive"

type navigationProps = NativeStackScreenProps<rootTypes,'HelloSection'>

export function Hello({navigation}:navigationProps){

    return(
        <View style={contactStyles.contianer}>
            <BottomBlur />
            <TopBlur/>
            <View style={contactStyles.img} >
                <Image 
                source={require('../../img/allcoins_main.png')}
                resizeMode="contain"
                style={{height:"100%", marginTop: hp(15)}}
                />
            </View>
            <View style={contactStyles.textDiv}>
                <Text style={contactStyles.title}>Bem vindo à</Text>
                <Text style={StyleSheet.compose(contactStyles.title, {fontSize: hp(7)})}>
                    ALL COINS
                </Text>
                <Text style={StyleSheet.compose(contactStyles.text, {textAlign: 'center', color: 'white'})}>
                    VEJA COTAÇÕES EM TEMPO REAL
                </Text>

                <TouchableOpacity style={contactStyles.btn} onPress={()=>navigation.navigate('Login')}>
                    <Text style={[contactStyles.text,{color:'#00FFAA'}]}>
                    ACOMPANHAR AGORA
                    </Text>
                    <Image source={require('../../img/green-arrow.png')} resizeMode="contain"
                    style={{width:30}}/>
                </TouchableOpacity>
            </View>

        </View>
    )
}
