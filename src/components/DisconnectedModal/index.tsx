import { View, Text, TouchableOpacity } from "react-native";
import { errorModalStye } from "./style";

interface modalProps{
    visible: boolean,
    changeModalStatus: ()=>void
}

export function DisconnectedModal({visible, changeModalStatus}: modalProps){

    if(visible){
        return(
            <View style={[errorModalStye.container]}>
                <View style={errorModalStye.errorDiv}>
                        
                        <View>
                            <Text style={errorModalStye.text}>
                                Erro: Sem conexão com a internet
                            </Text>
                        </View>
                        <View style={errorModalStye.close}>
                            <TouchableOpacity 
                                activeOpacity={1} 
                                onPress={changeModalStatus} 
                                style={[errorModalStye.line,errorModalStye.line1]}
                            />
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={changeModalStatus} 
                                style={[errorModalStye.line,errorModalStye.line2]} 
                            />
                        </View>
                        
                    </View>
            </View>
        )
    }
}