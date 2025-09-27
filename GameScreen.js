import { useEffect, useState } from "react";
import {
    ImageBackground,
    View
} from "react-native";
import { Card } from "./Card";
import { cards } from "./const";
import { generateRandomList } from "./utils";

/**
 * GameScreen
 *
 * A responsive memory-match game screen built with React Native.
 *
 * Behavior:
 * - Initializes a deck with an even number of positions (totalCards), populated by randomly chosen pairs from a global cards array.
 * - Reveals all cards briefly at the start of each round or when difficulty increases.
 * - Allows revealing up to two cards; evaluates a match after a short delay.
 * - Marks matched pairs with a negative sentinel (-1) and disables interaction for them.
 * - When all positions are matched, automatically increases difficulty by adding 2 more cards.
 *
 * Timing:
 * - Initial reveal duration is (totalCards / 2) * 1000 ms.
 * - Match evaluation delay is 1000 ms.
 *
 * Layout:
 * - Computes a near-square grid: columns = ceil(sqrt(number of cards)).
 * - Each card cell width is 100 / columns percent, with spacing between cells.
 *
 * State:
 * - totalCards: even integer >= 2 that controls the number of card positions.
 * - revealedCards: number[] of currently revealed card indices (0–2 items).
 * - pickedCards: number[] where positive values reference entries in the global cards array; matched positions are set to -1.
 *
 * Side effects:
 * - On totalCards change: generates a new randomized list of cards and reveals all indices.
 * - On revealedCards change: hides any revealed cards after the computed initial reveal duration.
 * - When exactly two cards are revealed: checks for a match; if matched, marks them with -1, clears the reveal buffer, and if all are matched, increases totalCards by 2.
 *
 * External requirements:
 * - cards: array holding available card identifiers/images.
 * - generateRandomList(count, min, max): returns a list of integer indices to sample from the cards array.
 * - Card component props: { card: number, index: number, revealCard: () => void, isRevealed: boolean }.
 *
 * Interaction rules:
 * - Matched positions are not rendered and have pointer events disabled.
 * - A card cannot be revealed if already revealed, already matched, or if two cards are currently revealed.
 *
 * @returns {JSX.Element} A React Native ImageBackground containing a responsive grid of memory cards.
 */
export default function GameScreen() {
    const [totalCards, setTotalCards] = useState(2); // must be even
    const revealMilliseconds = (totalCards / 2) * 1000;
    const [revealedCards, setRevealedCards] = useState([]);
    const [pickedCards, setPickedCards] = useState([]);

    /**
     * On totalCards change: generate a new random list of cards and reveal all initially
     * 
     */
    useEffect(() => {
        const c = generateRandomList(totalCards, 0, cards.length - 1).map(i => cards[i]);
        setPickedCards(c);
        // reveal all initially
        setRevealedCards(Array.from(c.keys()));
    }, [totalCards]);

    /**
     * On revealedCards change: hide all revealed cards after revealMilliseconds
     */
    useEffect(() => {
        if (revealedCards.length === 0) return;
        const t = setTimeout(() => setRevealedCards([]), revealMilliseconds);
        return () => clearTimeout(t);
    }, [revealedCards, revealMilliseconds]);

    /**
     * When exactly two cards are revealed, check for a match after 1000ms
     */
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
    }, [revealedCards, pickedCards, revealMilliseconds]);

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