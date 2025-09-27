import { useEffect, useState } from "react";
import {
    ImageBackground,
    View
} from "react-native";
import { Card } from "./Card";
import { cards } from "./const";
import { generateRandomList } from "./utils";

export default function GameScreen() {
    const totalCards = 6;
    const [revealedCards, setRevealedCards] = useState([]);
    const [pickedCards, setPickedCards] = useState([]);

    useEffect(() => {
        setPickedCards(generateRandomList(totalCards, 0, cards.length - 1).map(i => cards[i]));
        setRevealedCards(pickedCards);

        setTimeout(() => {
            setRevealedCards([]);
            console.log('Cards hidden');
        }, (totalCards / 2) * 1000);
    }, []);

    return (
        <ImageBackground
            source={require('./assets/images/table-top.jpg')}
            style={{ flex: 1, width: '100%', height: '100%' }}
            resizeMode="stretch"
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {pickedCards.map((card, index) => (
                        <Card key={index} card={card} index={index}
                            revealCard={(c) => setRevealedCards((prev) => [...prev, index + ':' + c])}
                            isRevealed={revealedCards.includes(index + ':' + card)} />
                    ))}
                </View>
            </View>
        </ImageBackground>

    );
}