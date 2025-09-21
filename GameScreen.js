import {
    ImageBackground,
    Text,
    View
} from "react-native";

export default function GameScreen() {
    return (
        <ImageBackground
            source={require('./assets/images/table-top.jpg')}
            style={{ flex: 1, width: '100%', height: '100%' }}
            resizeMode="stretch"
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Second Activity (Screen)</Text>
            </View>
        </ImageBackground>

    );
}