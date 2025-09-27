import { useEffect, useState } from "react";
import {
    ImageBackground,
    View
} from "react-native";
import { Card } from "./Card";
import { cards } from "./const";
import { generateRandomList } from "./utils";

export default function GameScreen() {
    const [totalCards, setTotalCards] = useState(2); // must be even
    const revealSeconds = (totalCards / 3) * 1000;
    const [revealedCards, setRevealedCards] = useState([]);
    const [pickedCards, setPickedCards] = useState([]);

    useEffect(() => {
        const c = generateRandomList(totalCards, 0, cards.length - 1).map(i => cards[i]);
        setPickedCards(c);
        // reveal all initially
        setRevealedCards(Array.from({ length: c.length }, (_, i) => i));
    }, [totalCards]);

    // Hide revealed cards after a delay (initial reveal or mismatches)
    useEffect(() => {
        if (revealedCards.length === 0) return;
        const t = setTimeout(() => setRevealedCards([]), revealSeconds);
        return () => clearTimeout(t);
    }, [revealedCards, revealSeconds]);

    // When exactly two cards are revealed, remove them if they match
    useEffect(() => {
        setTimeout(() => {
            if (revealedCards.length !== 2) return;
            const [a, b] = revealedCards;
            if (
                pickedCards[a] !== undefined &&
                pickedCards[b] !== undefined &&
                pickedCards[a] === pickedCards[b]
            ) {
                setPickedCards(prev => {
                    const toRemove = new Set([a, b]);
                    const next = prev.filter((_, idx) => !toRemove.has(idx));
                    if (next.length === 0) {
                        setTotalCards(tc => tc * 2);
                    }
                    return next;
                });
                // Clear revealed to allow next picks immediately
                setRevealedCards([]);
            }
        }, revealSeconds / 2);
    }, [revealedCards, pickedCards]);

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
                                setRevealedCards(prev =>
                                    prev.length === 2 ? prev : (prev.includes(index) ? prev : [...prev, index])
                                )
                            }
                            isRevealed={revealedCards.includes(index)}
                        />
                    ))}
                </View>
            </View>
        </ImageBackground>
    );
}