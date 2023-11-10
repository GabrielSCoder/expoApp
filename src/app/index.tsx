import Livros from "../components/Livros";
import LoginForm from "./LoginForm";
import { SafeAreaView} from "react-native-safe-area-context";
import { Text, View } from "react-native";
import Header from "../components/Header";


function H() {
    return (
        <View className="bg-gray-200 h-full">
            <Header />
            <LoginForm />
        </View>
    )
}

export default H