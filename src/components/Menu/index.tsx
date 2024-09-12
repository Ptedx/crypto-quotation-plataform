import { View, Text, Image } from "react-native"
import { priceStyles } from "./styles"

interface menuProps{
    name: string
}

export function Menu({name}:menuProps){

    return(
            <View style={priceStyles.contianer}>
                <View>
                    <Text style={priceStyles.text}>Boa Noite,</Text>
                    <Text style={priceStyles.title}>{name}!</Text>
                </View>
                <Image 
                    source={require('../../img/Profile Photo.jpg')}
                    style={{width:50, height: '100%', borderRadius:50}}
                />
            </View>
    )
}
