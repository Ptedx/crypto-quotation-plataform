import { View, Text, Image, TouchableOpacity, Modal} from "react-native"
import { priceStyles } from "./styles"
import { useState } from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { rootTypes } from "../../types/types"
import * as SecureStorage from 'expo-secure-store'
import { CommonActions } from "@react-navigation/native";
interface menuProps{
    name: string
}
type MenuProps = {
    navigation: NativeStackNavigationProp<rootTypes, 'MainTabs'>
}

export function Menu({name, navigation}:menuProps & MenuProps){
    const [isModalVisible, setModalVisible] = useState<boolean>(false)

    function changeModalStatus() {
        setModalVisible(!isModalVisible);
      }

    function logout(){
        changeModalStatus()
        SecureStorage.deleteItemAsync('AuthToken')
        navigation.navigate('HelloSection')
        navigation.dispatch(
            CommonActions.reset({
                index:0,
                routes:[{name:'HelloSection'}]
            })
        )
    }

    return(
            <View style={priceStyles.contianer}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={changeModalStatus}
                >
                    <View style={priceStyles.modalContainer}>
                        <TouchableOpacity onPress={changeModalStatus} style={priceStyles.modalOpacity}></TouchableOpacity>
                        <View style={priceStyles.modalItems}>
                            <TouchableOpacity style={{padding:10, backgroundColor:'#00ffaa'}} 
                            onPress={logout}> 
                                <Text style={[priceStyles.text,{textAlign: 'center', color:'green'}]}>
                                    Sair
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View>
                    <Text style={priceStyles.text}>Olá,</Text>
                    <Text style={priceStyles.title}>{name}!</Text>
                </View>
                <TouchableOpacity style={{width:50,height:50, borderRadius:50}} onPress={changeModalStatus}> 
                    <Image 
                        source={require('../../img/avatar.png')}
                        style={{width:50, height: '100%', borderRadius:50}}
                    />
                </TouchableOpacity>
            </View>
    )
}
