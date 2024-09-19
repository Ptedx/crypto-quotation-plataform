import { View, Text, FlatList, ScrollView } from "react-native"
import { graphStyles } from "./styles"
import { coinsData } from "../../models/cyptoInfos"


export function Balance(){

    return(
        <View style={graphStyles.contianer}>
            <Text style={graphStyles.text}>Balance:</Text>
            <Text style={graphStyles.title}>$37893.84</Text>
        </View>
    )
}
