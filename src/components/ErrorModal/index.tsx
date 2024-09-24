import { View, Text, Modal, TouchableOpacity } from "react-native";
import { errorModalStye } from "./style";

interface modalProps{
    visible: boolean,
    changeModalStatus: ()=>void
}

export function ErrorModal({visible, changeModalStatus}: modalProps){

    return(
        <Modal 
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={changeModalStatus}
        >
            <View style={errorModalStye.container}>
                <View style={errorModalStye.errorDiv}>
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
                    <View style={errorModalStye.textArea}>
                        <Text style={errorModalStye.title}>
                            ERROR
                        </Text>
                        <Text style={errorModalStye.subTitle}>
                            Sem conexão com a internet!
                        </Text>
                        <Text style={errorModalStye.text}>
                            Por favor verifique sua internet e tente novamente!
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}