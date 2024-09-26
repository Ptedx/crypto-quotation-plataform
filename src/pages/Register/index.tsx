import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"
import { rootTypes } from "../../types/types"
import { infoStyles } from "../Login/styles"
import { Btn } from "../../components/Button"
import { useState } from "react"
import axios from "axios"
import { CommonActions } from "@react-navigation/native"
import { BottomBlur, TopBlur } from "../../components/background_blur"
import * as SecureStorage from 'expo-secure-store'
import { ErrorModal } from "../../components/ErrorModal"
import { hp, wp } from "../../components/Responsive"

type navigationProps = NativeStackScreenProps<rootTypes, 'Register'>

export function Register({navigation}: navigationProps){
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [isTouched, setIsTouched] = useState<boolean>(false)
    const [isVisible, setVisible] = useState<boolean>(false)

    function changeModalStatus(){
        setVisible(!isVisible)
    }

    function resetFields(){
        setName('')
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
            const response = await axios.post('http://192.168.15.116:3002/register', {
                name: name,
                email: email,
                password: password,
            });

            if(response.status == 201){
                await SecureStorage.setItemAsync('AuthToken', JSON.stringify({token: response.data.token,name: name}))
                return response.status
            }
            return response.data.message
        } catch (error) {
            console.log(error)
        }
    }

    async function validadeLogin(){
        setIsTouched(true)
        Keyboard.dismiss()
        if(email!=='' && password !=='' && name!==''){
            setIsTouched(false)
            const res = await sendText()
            if (res == 201){
                resetFields()
                resetStack()
                navigation.navigate('MainTabs',{
                    name:name
                })
            }else{
                alert(`Erro: Usuário já cadastrado!`)
            }
        }
    }
    function goLogin(){
        setIsTouched(false)
        resetFields()
        navigation.navigate('Login')
    }

    return(
        <View style={[infoStyles.contianer,{marginTop:-30}]}>
            <ErrorModal visible={isVisible} changeModalStatus={changeModalStatus}/>

            <BottomBlur />
            <TopBlur />
            <ScrollView style={{width: wp(100)}}>
                <View style={infoStyles.loginArea}>
                    <Image 
                        source={require('../../img/allcoins_main.png')}
                        resizeMode="contain"
                        style={{height: hp(25), marginTop: hp(3)}}
                    />
                    <Text style={StyleSheet.compose(infoStyles.text, infoStyles.title)}>
                        JUNTE-SE À ALL COINS
                    </Text>
                    <Text style={[infoStyles.text, infoStyles.subtitle]}>
                        Preencha os campos para registrar-se
                    </Text>
                    <Text style={infoStyles.errorText}>
                        {!name && isTouched? 'Campo Obrigatório':''}
                    </Text>
                    <TextInput 
                        style={infoStyles.input} 
                        placeholder="Nome" 
                        placeholderTextColor={"#B0B0B0"}  
                        value={name}
                        onChange={(item)=>setName(item.nativeEvent.text)}
                    />
                    <Text style={infoStyles.errorText}>
                        {!email && isTouched? 'Campo Obrigatório':''}
                    </Text>
                    <TextInput 
                        style={infoStyles.input} 
                        placeholder="Email"
                        placeholderTextColor={"#B0B0B0"}   
                        value={email}
                        onChange={(item)=>setEmail(item.nativeEvent.text)}
                    />
                    <Text style={infoStyles.errorText}>
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
                    <Btn content='REGISTRAR' action={validadeLogin} change={changeModalStatus} />

                    <View style={{flexDirection:'row', marginTop: hp(2), marginBottom: 20}}>
                        <Text style={infoStyles.text}>
                            Já possui uma conta?
                        </Text>
                        <TouchableOpacity onPress={()=>goLogin()}>
                            <Text style={StyleSheet.compose(infoStyles.text, {color: 'green'})}> Logar-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
    )
}
