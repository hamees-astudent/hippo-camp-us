import * as Updates from "expo-updates";
import { useCallback } from "react";
import {
    Button,
    ImageBackground,
    Platform,
    Text,
    View
} from "react-native";

export default function MainScreen() {
    const onReloadPress = useCallback(() => {
        if (Platform.OS === "web") {
            location.reload();
        } else {
            Updates.reloadAsync();
        }
    }, []);

    return (
        <ImageBackground
            source={require('./assets/images/splash-screen.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
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
                <Button title="Start" onPress={onReloadPress} />
            </View>
        </ImageBackground>
    );
}
