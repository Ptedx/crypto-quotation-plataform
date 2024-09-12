import { View, Text } from "react-native"
import { graphStyles } from "./styles"



export function Balance(){

    return(
        <View style={graphStyles.contianer}>
            <Text style={graphStyles.text}>Balance:</Text>
            <Text style={graphStyles.title}>$37893.84</Text>
        </View>
    )
}
