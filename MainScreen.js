import { useCallback } from "react";
import {
    Button,
    ImageBackground,
    Text,
    View
} from "react-native";

export default function MainScreen({ navigation }) {
    const onStartPress = useCallback(() => {
        navigation.navigate('GameScreen')
    }, []);

    return (
        <ImageBackground
            source={require('./assets/images/main-menu.png')}
            style={{ flex: 1, width: '100%', height: '100%' }}
            resizeMode="stretch"
        >
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingBottom: 50,
                }}
            >
                <Text
                    style={{
                        color: "black",
                        fontSize: 30,
                        marginBottom: 15,
                        fontWeight: "bold",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        padding: 10,
                        borderRadius: 8,
                        textAlign: "center",
                    }}
                >
                    Challenge your brain not yourself!
                </Text>
                <Button title="Start" onPress={onStartPress} />
            </View>
        </ImageBackground>
    );
}
