import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"
import { rootTypes } from "../../types/types"
import { infoStyles } from "../Login/styles"
import { Btn } from "../../components/Button"
import { useState } from "react"
import axios from "axios"
import { CommonActions } from "@react-navigation/native"
import { BottomBlur, TopBlur } from "../../components/background_blur"

type navigationProps = NativeStackScreenProps<rootTypes, 'Register'>

export function Register({navigation}: navigationProps){
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [isTouched, setIsTouched] = useState<boolean>(false)

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
                return response.status
            }
            return response.data.message
        } catch (error) {
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
        <View style={infoStyles.contianer}>
            <BottomBlur />
            <TopBlur />
            <ScrollView style={{width: '100%'}}>
                <View style={infoStyles.loginArea}>
                    <Image 
                        source={require('../../img/coins-main.png')}
                        resizeMode="contain"
                        style={{width: 150, height:150,marginVertical: 20}}
                    />
                    <Text style={StyleSheet.compose(infoStyles.text, infoStyles.title)}>
                        JUNTE-SE À ALL COINS
                    </Text>
                    <Text style={infoStyles.text}>
                        Preencha os campos para registrar-se
                    </Text>
                    <Text style={{color:'red', width: '100%', paddingHorizontal:40}}>
                        {!name && isTouched? 'Campo Obrigatório':''}
                    </Text>
                    <TextInput 
                        style={infoStyles.input} 
                        placeholder="Nome" 
                        value={name}
                        onChange={(item)=>setName(item.nativeEvent.text)}
                    />
                    <Text style={{color:'red', width: '100%', paddingHorizontal:40}}>
                        {!email && isTouched? 'Campo Obrigatório':''}
                    </Text>
                    <TextInput 
                        style={infoStyles.input} 
                        placeholder="Email" 
                        value={email}
                        onChange={(item)=>setEmail(item.nativeEvent.text)}
                    />
                    <Text style={{color:'red', width: '100%', paddingHorizontal:40}}>
                        {!password && isTouched? 'Campo Obrigatório':''}
                    </Text>
                    <TextInput 
                        style={infoStyles.input} 
                        placeholder="Senha" 
                        value={password}
                        onChange={(item)=>setPassword(item.nativeEvent.text)}
                        secureTextEntry={true}
                    />
                    <Btn content='REGISTRAR' action={validadeLogin} />

                    <View style={{flexDirection:'row', marginTop: 60, marginBottom: 20}}>
                        <Text style={infoStyles.text}>
                            Já possui uma conta?
                        </Text>
                        <TouchableOpacity onPress={()=>goLogin()}>
                            <Text style={StyleSheet.compose(infoStyles.text, {color: '#3C4D80'})}> Logar-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
    )
}
