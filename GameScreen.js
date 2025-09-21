import {
    ImageBackground,
    View
} from "react-native";
import { Card } from "./Card";
import { cards } from "./const";
import { generateRandomList } from "./utils";

export default function GameScreen() {
    const totalCards = 4;

    const pickedCards = generateRandomList(totalCards, 0, cards.length - 1).map(i => cards[i]);

    return (
        <ImageBackground
            source={require('./assets/images/table-top.jpg')}
            style={{ flex: 1, width: '100%', height: '100%' }}
            resizeMode="stretch"
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {pickedCards.map((card, index) => (
                        <Card key={index} card={card} index={index} />
                    ))}
                </View>
            </View>
        </ImageBackground>

    );
}