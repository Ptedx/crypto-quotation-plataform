import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadStyles } from "./style";

export function LoadingComponent(){
    
    return(<SafeAreaView style={loadStyles.container}>
            <ActivityIndicator size={100} color="#00ffaa" />
          </SafeAreaView>
    )
}