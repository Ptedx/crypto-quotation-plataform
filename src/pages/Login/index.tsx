import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"
import { rootTypes } from "../../types/types"
import { infoStyles } from "./styles"
import { Btn } from "../../components/Button"
import { useState } from "react"
import axios from "axios"
import * as SecureStorage from 'expo-secure-store'
import { CommonActions } from "@react-navigation/native"
import { BottomBlur, TopBlur } from "../../components/background_blur"

type navigationProps = NativeStackScreenProps<rootTypes, 'Login'>

export function Login({navigation}: navigationProps){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [isTouched, setIsTouched] = useState<boolean>(false)
    

    function resetFields(){
        setEmail('')
        setPassword('')
    }
    
    function resetStack(){
        navigation.dispatch(
            CommonActions.reset({
                index:0,
                routes:[{name: 'MainTabs'}]
            })
        )
    }

    async function sendText() {
        try {
            const response = await axios.post('https://crypto-quotation-plataform.onrender.com/login',{
                email: email,
                password: password
            });
            await SecureStorage.setItemAsync('AuthToken', JSON.stringify({token: response.data.token,name: response.data.name}))
            return response
        } catch (error) {
        }
    }


    async function validadeLogin(){
        setIsTouched(true)
        Keyboard.dismiss()
        if(email!='' && password !=''){
            setIsTouched(false)
            const res = await sendText()
            if (res?.status == 200){
                resetFields()
                resetStack()
                navigation.navigate('MainTabs',{name: res.data.name})

            }else{
                alert('Usuário e/ou senha inválidos')
            }
        }
    }
    
    function goRegister(){
        setIsTouched(false)
        resetFields()
        navigation.navigate('Register')
    }

    return(
        <View style={infoStyles.contianer}>
                <BottomBlur />
                <TopBlur />            
                <ScrollView style={{width: '100%'}}>
                    <View style={infoStyles.loginArea}>
                        <Image 
                            source={require('../../img/allcoins_main.png')}
                            resizeMode="contain"
                            style={{width: 200, height:200,marginVertical: 20}}
                        />
                        <Text style={StyleSheet.compose(infoStyles.text, infoStyles.title)}>
                            Bem vindo de volta!
                        </Text>
                        <Text style={StyleSheet.compose(infoStyles.text,{marginBottom: 20})}>
                            Preencha os campos para logar
                        </Text>

                        <Text style={{color:'red', width: '100%', paddingHorizontal:40}}>
                            {!email && isTouched? 'Campo Obrigatório':''}
                        </Text>
                        <TextInput 
                            style={infoStyles.input} 
                            placeholder="Email"
                            placeholderTextColor={"#B0B0B0"} 
                            value={email}
                            onChange={(item)=>setEmail(item.nativeEvent.text)}
                        />
                        <Text style={{color:'red', width: '100%', paddingHorizontal:40}}>
                            {!password && isTouched? 'Campo Obrigatório':''}
                        </Text>
                        <TextInput 
                            style={infoStyles.input} 
                            placeholder="Senha"
                            placeholderTextColor={"#B0B0B0"}  
                            value={password}
                            onChange={(item)=>setPassword(item.nativeEvent.text)}
                            secureTextEntry={true}
                        /> 
                    
                        <Btn content='LOGAR' action={validadeLogin} />

                        <View style={{flexDirection:'row', marginTop: 40, marginBottom: 20}}>
                            <Text style={infoStyles.text}>
                                Não possui uma conta ainda?
                            </Text>
                            <TouchableOpacity onPress={()=>goRegister()}>
                                <Text style={StyleSheet.compose(infoStyles.text, {color: 'green'})}> Registrar-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
        </View>
    )
}
