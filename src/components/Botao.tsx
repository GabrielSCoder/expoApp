import {TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

function Botao({btnText, classes, click} : {btnText : string, classes : string, click : any}) {
    return (
        <TouchableOpacity className={classes} onPress={click}>
            <Text>btnText</Text>
        </TouchableOpacity>
    )
}

export default Botao