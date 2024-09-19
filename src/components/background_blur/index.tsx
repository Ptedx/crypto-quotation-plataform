import { StyleSheet } from "react-native";
import { View, Image } from "react-native";

export function BottomBlur(){
    return(
        <View style={[styles.bottom_square,{opacity: 0.8}]}>
                <Image 
                source={require('../../img/blur_blue.png')}
                resizeMode="contain"
                style={{width: "100%"}}
                />
        </View>
    )
}

interface topProp{
    image?:string
}

export function TopBlur({image}:topProp){
    return(
        <View style={styles.top_square}>
                <Image 
                source={image? image : require('../../img/green_blur.png')}
                resizeMode="contain"
                style={{width: "100%"}}
                />
        </View>
    )
}


const styles = StyleSheet.create({
    bottom_square:{
        width:500,
        height:500,
        position: 'absolute',
        bottom: -250,
        left: -250,
    },
    top_square:{
        width:500,
        height:500,
        position: 'absolute',
        top: -225,
        right: -225,
    },
})