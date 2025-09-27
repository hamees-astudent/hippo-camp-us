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
    const revealSeconds = (totalCards / 2) * 1000;
    const [revealedCards, setRevealedCards] = useState([]);
    const [pickedCards, setPickedCards] = useState([]);

    useEffect(() => {
        const c = generateRandomList(totalCards, 0, cards.length - 1).map(i => cards[i]);
        setPickedCards(c);
        // reveal all initially
        setRevealedCards(Array.from(c.keys()));
    }, [totalCards]);

    // Hide revealed cards after a delay (initial reveal or mismatches)
    useEffect(() => {
        if (revealedCards.length === 0) return;
        const t = setTimeout(() => setRevealedCards([]), revealSeconds);
        return () => clearTimeout(t);
    }, [revealedCards, revealSeconds]);

    // When exactly two cards are revealed, mark them as matched (set to a negative sentinel) if they match
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (revealedCards.length !== 2) return;
            const [a, b] = revealedCards;
            if (
                pickedCards[a] !== undefined &&
                pickedCards[b] !== undefined &&
                pickedCards[a] === pickedCards[b]
            ) {
                setPickedCards(prev => {
                    const next = [...prev];
                    // mark matched cards with a negative sentinel
                    next[a] = -1;
                    next[b] = -1;

                    // if all positions are matched, increase difficulty
                    const allMatched = next.every(v => typeof v === 'number' && v < 0);
                    if (allMatched) {
                        setTotalCards(tc => tc + 2);
                    }
                    return next;
                });
                // Clear revealed to allow next picks immediately
                setRevealedCards([]);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [revealedCards, pickedCards, revealSeconds]);

    // Compute a near-square grid that adapts to the number of cards
    const columns = Math.ceil(Math.sqrt(Math.max(1, pickedCards.length)));
    const cellWidthPct = `${100 / columns}%`;

    return (
        <ImageBackground
            source={require('./assets/images/table-top.jpg')}
            style={{ flex: 1, width: '100%', height: '100%' }}
            resizeMode="stretch"
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <View
                    style={{
                        width: '100%',
                        maxWidth: 800,
                        paddingHorizontal: 12,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}
                >
                    {pickedCards.map((card, index) => {
                        const isMatched = typeof card === 'number' && card < 0;
                        return (
                            <View
                                key={index}
                                style={{
                                    width: cellWidthPct,
                                    padding: 6, // spacing between cards
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                pointerEvents={isMatched ? 'none' : 'auto'}
                            >
                                {!isMatched && (
                                    <Card
                                        card={card}
                                        index={index}
                                        revealCard={() =>
                                            setRevealedCards(prev => {
                                                if (prev.length === 2) return prev;
                                                if (prev.includes(index)) return prev;
                                                // do not allow revealing matched cards
                                                if (typeof pickedCards[index] === 'number' && pickedCards[index] < 0) return prev;
                                                return [...prev, index];
                                            })
                                        }
                                        isRevealed={revealedCards.includes(index)}
                                    />
                                )}
                            </View>
                        );
                    })}
                </View>
            </View>
        </ImageBackground>
    );
}