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
    const revealSeconds = (totalCards / 2) * 1000;
    const [revealedCards, setRevealedCards] = useState([]);
    const [pickedCards, setPickedCards] = useState([]);

    useEffect(() => {
        const c = generateRandomList(totalCards, 0, cards.length - 1).map(i => cards[i]);
        setPickedCards(c);
        // reveal all initially
        setRevealedCards(Array.from({ length: c.length }, (_, i) => i));
    }, []);

    // auto-clear revealedCards after revealSeconds whenever any are revealed
    useEffect(() => {
        if (revealedCards.length === 0) return;
        const t = setTimeout(() => setRevealedCards([]), revealSeconds);
        return () => clearTimeout(t);
    }, [revealedCards, revealSeconds]);

    return (
        <ImageBackground
            source={require('./assets/images/table-top.jpg')}
            style={{ flex: 1, width: '100%', height: '100%' }}
            resizeMode="stretch"
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {pickedCards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            index={index}
                            revealCard={() =>
                                setRevealedCards(prev => prev.length == 2 ? prev : (prev.includes(index) ? prev : [...prev, index]))
                            }
                            isRevealed={revealedCards.includes(index)}
                        />
                    ))}
                </View>
            </View>
        </ImageBackground>
    );
}